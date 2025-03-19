const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Replace with your bucket name
const bucketName = 'twitter-cb8e7.appspot.com';

// Creates a client
const storage = new Storage();

async function setCorsConfiguration() {
  const corsConfiguration = [
    {
      origin: ['http://localhost:3000'],
      method: ['GET', 'PUT', 'POST'],
      responseHeader: ['Content-Type', 'x-goog-resumable'],
      maxAgeSeconds: 3600,
    },
  ];

  try {
    // Get the bucket
    const bucket = storage.bucket(bucketName);

    // Set the CORS configuration
    await bucket.setCorsConfiguration(corsConfiguration);
    console.log(`CORS configuration updated for bucket ${bucketName}`);
  } catch (error) {
    console.error('Error setting CORS configuration:', error);
  }
}

setCorsConfiguration();
