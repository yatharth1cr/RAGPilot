const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const { AzureOpenAIEmbeddings } = require("@langchain/openai");
const { QdrantVectorStore } = require("@langchain/qdrant");
const client = require("../config/qdrantVectorConfig");

// ---------- Ingest PDF and store chunks in Qdrant ----------
function ingestPdf(pdfPath) {
  const loader = new PDFLoader(pdfPath);
  return loader
    .load()
    .then((docs) => {
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });
      return splitter.splitDocuments(docs);
    })
    .then((splitDocs) => {
      const embeddings = new AzureOpenAIEmbeddings({
        azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
        azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
        azureOpenAIApiDeploymentName:
          process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT,
        azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
      });
      return QdrantVectorStore.fromDocuments(splitDocs, embeddings, {
        client,
        collectionName: "rag_docs",
      }).then(() => ({ chunksStored: splitDocs.length }));
    })
    .catch((err) => {
      console.error("Error during PDF ingestion:", err);
      throw err;
    });
}

module.exports = { ingestPdf };
