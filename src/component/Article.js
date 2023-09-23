import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../Article.css";

// Import the JSON data
import jsonData from "../news.json"; // Replace with the correct path to your JSON file

const Article = () => {
  const [news, setNews] = useState([]);

  const fetchNews = useCallback(() => {
    // Assuming the JSON data is already imported
    // You can replace jsonData with the actual JSON data
    const data = jsonData;

    // Convert object to array
    const newsArray = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    setNews(newsArray);
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div>
      <h1 className="heading">Recent News</h1>
      <section className="articles">
        {news.map((article) => (
          <div className="article" key={article.id}>
            <div className="image">
              <img src={article.img} alt="Article" />
            </div>
            <div className="content">
              <span className="title">{article.title}</span>
              <span className="text">{article.summary}</span>
              <span className="author">{article.source}</span>
              <span className="sentiment">{article.sentiment}</span>
              <button>
                <Link to={article.url} target="_blank">
                  Read More
                </Link>
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Article;
