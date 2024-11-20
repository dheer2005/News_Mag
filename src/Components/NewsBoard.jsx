import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${
          import.meta.env.VITE_API_KEY
        }`;

        console.log("Fetching URL:", url); 

        const response = await fetch(url);

        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(
            `Error ${response.status}: ${response.statusText} - ${errorDetails.message}`
          );
        }

        const data = await response.json();

        if (!data.articles) {
          throw new Error("No articles found in the response.");
        }

        setArticles(data.articles);
        console.log("Articles fetched successfully:", data.articles); 
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err); 
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-danger">Error: {error}</p>}
      <div className="d-flex flex-wrap justify-content-center">
        {articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title || "No Title Available"}
            description={news.description}
            src={news.urlToImage || "https://via.placeholder.com/150"}
            url={news.url || "#"}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsBoard;
