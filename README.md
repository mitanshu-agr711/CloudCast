

Environment Configuration
Create a .env file in the root of your project and add the following:

Copy code
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
