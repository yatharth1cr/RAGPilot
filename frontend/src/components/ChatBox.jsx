import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(""); // for typing animation
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // --- Typing animation ---
  const typeMessage = (text) => {
    let i = 0;
    setBotTyping("");
    const interval = setInterval(() => {
      setBotTyping((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setMessages((prev) => [...prev, { sender: "bot", text }]);
        setBotTyping("");
      }
    }, 5); // speed of typing
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    fetch("http://localhost:5000/rag/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input }),
    })
      .then((res) => res.json())
      .then((data) => {
        const fullResponse =
          data.answer +
          (data.sources?.length
            ? `\n\n📚 Sources:\n${data.sources
                .map((s) => `- ${s.pageContent.slice(0, 80)}...`)
                .join("\n")}`
            : "");

        typeMessage(fullResponse);
      })
      .catch(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "❌ Something went wrong. Try again." },
        ]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botTyping, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <motion
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 max-w-[75%] rounded-2xl shadow-md whitespace-pre-line text-sm transition ${
                msg.sender === "user"
                  ? "bg-orange-600 text-white rounded-br-none"
                  : "bg-orange-100 text-orange-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </motion>
        ))}

        {/* Bot typing animation */}
        {botTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-3 max-w-[75%] rounded-2xl bg-orange-100 text-orange-900 text-sm shadow-md">
              {botTyping}
              <span className="animate-pulse">▋</span>
            </div>
          </div>
        )}

        {loading && !botTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-2 max-w-[75%] rounded-lg text-sm bg-orange-100 text-orange-900 animate-pulse">
              🤖 Thinking...
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input box */}
      <form
        onSubmit={sendMessage}
        className="bg-orange-300 border-t p-4 flex items-center gap-2 fixed bottom-0 left-0 right-0 z-10 shadow-lg"
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          rows={1}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(e);
            }
          }}
          className="flex-1 px-4 py-2 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg transition disabled:opacity-50 shadow-md"
        >
          Send
        </button>
      </form>
    </div>
  );
}
