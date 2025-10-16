// rag/llm.js
const { OpenAI } = require("openai");
function generateAnswerWithContext(question, context) {
  const prompt = `Use the following context:\n${context.join(
    "\n"
  )}\n\nQuestion: ${question}`;
  return OpenAI.Chat.Completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  })
    .then((response) => response.choices[0].message.content)
    .catch((error) => {
      console.error("Error generating answer:", error);
    });
}

module.exports = generateAnswerWithContext;
