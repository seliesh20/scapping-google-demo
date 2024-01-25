# AWS Lambda Web Scraping Project with Puppeteer

This repository contains the necessary files for deploying an AWS Lambda function with Puppeteer for web scraping, along with a Lambda Layer for handling dependencies. The project structure is organized into two main folders: `lambda` and `lambda-layer`.

## Lambda Function (`lambda` folder)

### Overview
The `lambda` folder contains the source code and configuration files for the AWS Lambda function.

### Files
1. **`index.js`**: This file contains the Node.js script for the Lambda function, including the handler function for web scraping with Puppeteer. 

2. **`.env`**: Configuration file with MongoDB connection settings.

### Deployment
To deploy the Lambda function, follow these steps:
1. Zip the contents of the `lambda` folder.
2. Create a new Lambda function in the AWS Management Console.
3. Upload the zip file as the deployment package.
4. Set the handler to `index.handler` (adjust as needed).


To run the Lambda function, you can change specified parameters as input. Typically, AWS Lambda functions receive input through an event object. Here's an example of how you might structure the input event for your Lambda function:

```json
{
  "webgl_vendor": "NVIDIA Corporation",
  "webgl_renderer": "NVIDIA GeForce GTX 1650/PCIe/SSE2",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.55",
  "language": "en-US",
  "viewport": {
    "width": 1366,
    "height": 768
  },
  "canvas": {
    "chance": 95,
    "shift": 5
  },
  "cookies":"[{\"name\":\"OGPC\",\"value\":\"19037049-1:\",\"domain\":\".google.com\",\"path\":\"/\",\"expires\":1708759482,\"size\":15,\"httpOnly\":false,\"secure\":false,\"session\":false,\"sameParty\":false,\"sourceScheme\":\"Secure\",\"sourcePort\":443},{\"name\":\"NID\",\"value\":\"511=t5nLPKR8z0yWyBAN0UVMpKD_pYjDls_TIeWRnQ2X6hJTI-RmZia9PqDCWeudsLHpVVv1Plx0JgtncL8EMnmjoOK6DkyrWovvkwBnsWTnchoC-MCJt3fYlTICN_n3Y5Mi1DDYbGCm_TY94EEWituSExB8Lpl_BcC599noWP5vbvCzaWnuQox7slnpWTxhBf2C\",\"domain\":\".google.com\",\"path\":\"/\",\"expires\":1721978681.49292,\"size\":199,\"httpOnly\":true,\"secure\":true,\"session\":false,\"sameSite\":\"None\",\"sameParty\":false,\"sourceScheme\":\"Secure\",\"sourcePort\":443},{\"name\":\"AEC\",\"value\":\"Ae3NU9M5gmabRYkpWPtHHezF9fGlSVc_lCYKs5sfvgrrkhcfSzsiy1n9qg\",\"domain\":\".google.com\",\"path\":\"/\",\"expires\":1721719479.643386,\"size\":61,\"httpOnly\":true,\"secure\":true,\"session\":false,\"sameSite\":\"Lax\",\"sameParty\":false,\"sourceScheme\":\"Secure\",\"sourcePort\":443},{\"name\":\"1P_JAR\",\"value\":\"2024-01-25-07\",\"domain\":\".google.com\",\"path\":\"/\",\"expires\":1708759483.171397,\"size\":19,\"httpOnly\":false,\"secure\":true,\"session\":false,\"sameSite\":\"None\",\"sameParty\":false,\"sourceScheme\":\"Secure\",\"sourcePort\":443}]"
}
```

## Lambda Layer (`lambda-layer` folder)

### Overview
The `lambda-layer` folder contains the necessary files for creating an AWS Lambda Layer with external dependencies.

### Files
1. **`package.json`**: Lists the Node.js dependencies required for Puppeteer and other dependencies. This file is used for running `npm install`.

### Deployment
To deploy the Lambda Layer, follow these steps:
1. Execute `npm install` to install the dependencies. 
2. create a zip file of the folder.
2. Create a new Lambda Layer in the AWS Management Console.
3. Upload the generated zip file as the Layer content.

### Usage in Lambda Function
When creating or updating the Lambda function, add the created Lambda Layer to it. Modify your Lambda function to import the necessary modules from the added Layer and use the handler function in `index.js` for web scraping with Puppeteer.

## Additional Notes
- Ensure that your AWS CLI is configured with the necessary permissions.
- Adjust file names, folder structures, and configurations as needed for your specific use case.
- Keep your MongoDB connection details secure and do not expose sensitive information in your code.

Feel free to customize the files and structure based on your project requirements. If you encounter any issues or have questions, refer to the AWS Lambda documentation for more information.
