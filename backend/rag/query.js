const { QdrantClient } = require("@qdrant/js-client-rest");
const { QdrantVectorStore } = require("@langchain/qdrant");
const { AzureOpenAIEmbeddings, AzureChatOpenAI } = require("@langchain/openai");
const { RetrievalQAChain } = require("langchain/chains");

// ----------Query with RAG----------
function queryWithRAG(question) {
  const client = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
  });

  return QdrantVectorStore.fromExistingCollection(
    new AzureOpenAIEmbeddings({
      azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
      azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
      azureOpenAIApiDeploymentName:
        process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT,
      azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    }),
    { client, collectionName: "rag_docs" }
  )
    .then((vectorStore) => {
      const model = new AzureChatOpenAI({
        temperature: 0,
        azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
        azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
        azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_DEPLOYMENT,
        azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
      });

      const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
        returnSourceDocuments: true,
      });

      return chain.call({ query: question });
    })
    .then((response) => {
      return {
        answer: response.result || response.text || "No answer found.",
        sources: response.sourceDocuments || [],
      };
    })
    .catch((err) => {
      return {
        answer: "Error occurred: " + err.message,
        sources: [],
      };
    });
}

module.exports = { queryWithRAG };
