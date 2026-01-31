import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

const dummyNews = [
  { title: "AI Breakthrough", simplified: "AI has done something amazing today!" },
  { title: "Sports Update", simplified: "Your favorite team won the match!" },
  { title: "Environment News", simplified: "A new plan is in action to protect nature." }
];

const NewsFeed = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    setNews(dummyNews);
  }, []);

  return (
    <div>
      {news.map((n, i) => (
        <NewsCard key={i} title={n.title} simplified={n.simplified} />
      ))}
    </div>
  );
};

export default NewsFeed;
