import React from "react";

const NewsCard = ({ title, simplified }) => {
  const readAloud = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utter);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="mt-2">{simplified}</p>
      <button
        className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => readAloud(simplified)}
      >
        🔊 Read Aloud
      </button>
    </div>
  );
};

export default NewsCard;
