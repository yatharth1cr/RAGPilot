import { useState, useRef, useEffect } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Function to send message
  // and handle response from the server
  // This function is called when the user submits the form
  // It sends the user's message to the server
  // and updates the chat with the bot's response
  const sendMessage = (e) => {
    e.preventDefault();

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    fetch("http://localhost:5000/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
      })
      .catch(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "❌ Something went wrong. Try again." },
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-120px)] ">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {/* Chat messages */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 max-w-[75%] rounded-lg text-sm whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-orange-600 text-white rounded-br-none"
                  : "bg-orange-200 text-orange-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 max-w-[75%] rounded-lg text-sm bg-orange-200 text-orange-900 animate-pulse">
              🤖 Thinking...
            </div>
          </div>
        )}
        {/* Scroll to bottom of chat */}
        <div ref={chatEndRef} />
      </div>

      <form
        onSubmit={sendMessage}
        className="bg-orange-300  border-t p-4 flex items-center gap-2 fixed bottom-0 left-0 right-0 z-10 shadow-md"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 required"
        />
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-400 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
