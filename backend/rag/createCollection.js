// backend/rag/createCollection.js
const client = require("../config/qdrantVectorConfig");

function createCollection(req, res) {
  client
    .createCollection("documents", {
      vectors: {
        size: 1536,
        distance: "Cosine",
      },
    })
    .then(() => {
      res.status(201).json({ message: "Collection created" });
    })
    .catch((error) => {
      console.error("Error creating collection:", error);
      res.status(500).json({ error: "Failed to create collection" });
    });
}

module.exports = createCollection;
