import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 📰 News route
app.get("/news", async (req, res) => {
  const { category = "general", audience = "general" } = req.query;

  try {
    const apiKey = process.env.GNEWS_API_KEY;
    const url = `https://gnews.io/api/v4/top-headlines?topic=${category}&lang=en&token=${apiKey}&max=10`;

    const response = await axios.get(url);
    const articles = response.data.articles.map((a) => ({
      title: a.title,
      url: a.url,
      image: a.image,
      source: a.source.name,
      publishedAt: a.publishedAt,
      simplified: a.description || "",
    }));

    res.json(articles);
  } catch (err) {
    console.error("Error fetching news:", err.message);
    res.status(500).json({ error: "Error fetching news" });
  }
});

// 🧠 AI summary route
app.post("/ai/summarize", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
      }
    );

    res.json({ summary: response.data[0].summary_text });
  } catch (err) {
    console.error("Error generating summary:", err.message);
    res.status(500).json({ error: "Error generating summary" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
