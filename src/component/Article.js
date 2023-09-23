import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../Article.css";

const Article = () => {
  const [news, setNews] = useState([]);

  const fetchNews = useCallback(() => {
    fetch("/news")
      .then((response) => response.json())
      .then((data) => {
        // Convert object to array
        const newsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setNews(newsArray);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);
  console.log(news);

  return (
    <div>
      <h1 className="heading">Recent News</h1>
      <section className="articles">
        <div className="article">
          <div className="image">IMAGE</div>
          <div className="content">
            <span className="title">Title</span>
            <span className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
              lorem vel augue euismod vestibulum. Nam et urna quam. Praesent ut
              condimentum turpis. Fusce turpis nisi, pellentesque sed odio sed,
              sagittis finibus metus. Donec in finibus massa. Phasellus mollis
              vel lorem in laoreet. Etiam varius egestas nulla non pulvinar.
            </span>
            <span className="author">Author</span>
            <span className="date">Date Published</span>
            <button>Read More</button>
          </div>
        </div>
      </section>
    </div>
  );
  // return (
  //   <div className="news-container">
  //     <h1 className="news-header">Latest News</h1>
  //     {Array.isArray(news) && news.map(item => {
  //       const { img, sentiment, source, summary, title, url } = item;
  //       return (
  //         <div className="article" key={title}>
  //           <div className="article-image">
  //             <img src={img} alt={title} />
  //           </div>
  //           <div className="article-list">
  //             <div className="article-content">
  //               <h2 className="article-title">{title}</h2>
  //               <p className="article-summary">{summary}</p>
  //               <p className="article-source">{source}</p>
  //               <p className="article-sentiment">{sentiment}</p>
  //               <a className="article-link" href={url}>
  //                 Read More
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
};

export default Article;
