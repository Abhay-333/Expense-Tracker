import React, { useState, useEffect } from 'react';
import { Card } from "../components/ui/card";

const News = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const API_KEY = 'YOUR_ALPHA_VANTAGE_API_KEY'; // Replace with your API key
        const response = await fetch(
          `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=financial_markets&apikey=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        setNews(data.feed || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching news:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Financial News</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((article, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.summary}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{article.source}</span>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Read More
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default News;