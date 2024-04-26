# playmakers-backend-assessment

## Assessment Requirements

- We want users to upload a badge: an avatar within a circle. Create a function taking a png as input and verifying that:
Size = 512x512, The only non transparent pixels are within a circle, That the colors is the badge give a "happy" feeling.
Additionally, you can create a parallel function that converts the given image (of any format) into the specified object.


## Getting Started

### Prerequisites
The tools listed below are needed to run this application:
* Node v22.0.0 or above, this is the least version compactible with sharp package
* Npm v10.5.1 or above


You can check the Node.js and npm versions by running the following commands.

### check node.js version
`node -v`

### check npm version
`npm -v`

## Technology Used

- NodeJS
- express
- sharp
- multer
- express-async-handler


## Setup

To setup the app,

1. Clone the app to your local machine and run `npm install`

2. Provide local credentials for running the app the `src/config/dev.js`

3. Then run `npm run start:dev` for development 


## Endpoints

| Method      | Description    | Endpoints    | Role   | 
| :------------- | :----------: | -----------: | -----------: |
|  POST | User covert and upload image   | /api/v1/badge-processing/convert   | *   |
| POST   | User upload image | /api/v1/badge-processing/upload | * |
|  GET | Health-check   | /api/v1/badge-processing/health-check   | *   |


## Postman documentation

https://documenter.getpostman.com/view/11998048/UUxwBUSq