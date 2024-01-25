require('dotenv').config()
const process = require('process')
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-extra')
const stealth = require('puppeteer-extra-plugin-stealth')
const chromium = require('@sparticuz/chromium')
const MongoClient = require("mongodb").MongoClient

const mongoConnStr = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.DATABASE}?retryWrites=true`;

const client = new MongoClient(mongoConnStr);
let db;

const createConn = async () => {
    await client.connect();
    db = client.db(process.env.DATABASE);
};

puppeteer.use(stealth())

exports.handler = async (event, context) => {
  
  //Fingerprint
  const fingerprinterplugin =  await import('puppeteer-extra-plugin-fingerprinter')
  
  let fingerprinter = fingerprinterplugin.createFingerprinterInterface({
    fingerprint_generator: {
      webgl_vendor: event?.webgl_vendor || "NVIDIA Corporation", 
      webgl_renderer: event?.webgl_renderer || "NVIDIA GeForce GTX 1650/PCIe/SSE2",
      userAgent: event?.userAgent || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.55",
      language: event?.language || "en-US",
      viewport: event?.viewport || { "width": 1366, "height": 768 },            
      canvas: event?.canvas || {chance: 95, shift: 5} 
    }
  })
    
  puppeteer.use(fingerprinter)
  
  try {
    const browser = await puppeteer.launch({
      executablePath: await chromium.executablePath(),
      headless: true,
      ignoreHTTPSErrors: true,
      defaultViewport: chromium.defaultViewport,
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    });
    const page = await browser.newPage();
    
    //Cookies
    if(event?.cookies){
      const cookies = JSON.parse(event?.cookies);
      await page.setCookie(...cookies)
    }
    
    await page.goto("https://www.google.com", { waitUntil: 'networkidle0' });
    
    //save to database
    await createConn()
    const scrapdatas = db.collection(process.env.COLLECTION)
    
    const doc = {
      title: await page.title(),
      content: await page.evaluate(() => document.querySelector('*').outerHTML),
      url:await page.url(),
      cookies:await page.cookies(),
      date:new Date().toISOString()
    }
    
    // Insert the defined document into the "scrapdatas" collection
    const result = await scrapdatas.insertOne(doc);
    
    const response = {
      statusCode: 200,
      message:"Scrapped Successfully"
    };
    
    await browser.close();
    return response;
  } catch(error){
    const response = {
      statusCode: 200,
      body: JSON.stringify(error),
      mongoConnStr:mongoConnStr
    };
    return response;
  }
};
