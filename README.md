# Express.js API

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Server](#running-the-server)
- [License](#license)

## Introduction
This is a Node.js API built using the Express.js framework. It provides RESTful endpoints and utilizes MongoDB as a database, along with Cloudinary for media storage.

## Features
- RESTful API using Express.js
- MongoDB database connection
- Authentication using JWT
- Cloudinary for media storage
- CORS support

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [MongoDB](https://www.mongodb.com/)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Environment Configuration
Create a `.env` file in the root directory and add the following:

```
PORT=3000

MONGODB_URL=your-mongodb-connection-url-here

CORS_ORIGIN=*

ACCESS_TOKEN_SECRET=your-access-token-secret-here
ACCESS_TOKEN_EXPIRE=1d

REFRESH_TOKEN_SECRET=your-refresh-token-secret-here
REFRESH_TOKEN_EXPIRE=10d

CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name-here
CLOUDINARY_API_KEY=your-cloudinary-api-key-here
CLOUDINARY_API_SECRET=your-cloudinary-api-secret-here
```

## Running the Server
To start the server in development mode:
```sh
npm run dev
```

To start the server in production mode:
```sh
npm start
```


## License
This project is licensed under the MIT License.

