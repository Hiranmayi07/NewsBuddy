import React, { useEffect, useState } from "react";

function Home() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [audience, setAudience] = useState("general");

  // AI Assistant states
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch news from backend
  const fetchNews = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/news?category=${category}&audience=${audience}`
      );
      const data = await res.json();
      setNews(data);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  // Fetch news whenever category or audience changes
  useEffect(() => {
    fetchNews();
  }, [category, audience]);

  // AI summary handler
  const handleSummarize = async () => {
    if (!inputText) return;
    setLoading(true);
    setSummary(""); // Clear previous summary
    try {
      const res = await fetch("http://localhost:5000/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      console.error("Error generating summary:", err);
      setSummary("Error generating summary. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        📰 NewsBuddy AI
      </h1>

      {/* Dropdowns */}
      <div className="flex justify-center gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="general">All Categories</option>
          <option value="sports">Sports</option>
          <option value="tech">Tech</option>
          <option value="ai">AI</option>
          <option value="environment">Environment</option>
        </select>

        <select
          className="border p-2 rounded"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
        >
          <option value="general">General</option>
          <option value="teen">Teen</option>
        </select>
      </div>

      {/* News Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mb-8">
        {news.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt="news"
              className="rounded-lg mb-3 h-48 w-full object-cover"
            />
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600 text-sm">{item.simplified}</p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mt-3 inline-block"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>

      {/* AI Assistant */}
      <div className="my-6 p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-2">🤖 AI Assistant</h2>
        <textarea
          className="border w-full p-2 rounded mb-2"
          rows={4}
          placeholder="Paste any text to summarize..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSummarize}
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
        {summary && (
          <div className="mt-3 p-2 bg-gray-100 rounded">
            <strong>Summary:</strong>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
