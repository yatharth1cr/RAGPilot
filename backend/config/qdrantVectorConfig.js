// qdrant/qdrantClient.js

const { QdrantClient } = require("@qdrant/js-client-rest");
const dotenv = require("dotenv");
dotenv.config();

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

// Fetch the list of collections using then/catch for promise handling
client
  .getCollections()
  .then((result) => {
    // Log the collections if the request is successful
    console.log("List of collections:", result.collections);
  })
  .catch((err) => {
    // Log the error if the request fails
    console.error("Could not get collections:", err);
  });

module.exports = client;
