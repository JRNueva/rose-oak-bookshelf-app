import { Divider, Typography, Container, Box } from "@mui/material";
import { useState, useEffect } from "react";
import BookDisplay from "../components/books-component/BookDisplay";

import { getTrendingBooks, getPopularFiction, getScienceTech, getHistoryBiography } from "../api/bookService";

const Section = ({ title, books, isFirst, loading, skeletonCount = 6 }) => {
  const skeletonBooks = Array.from({ length: skeletonCount }, (_, index) => ({ id: `skeleton-${index}` }));
  
  return (
    <Box>
      <Typography variant={isFirst ? "h4" : "h5"} component={isFirst ? "h1" : "h2"} sx={{ mb: 2, color: 'primary.main', fontWeight: '600' }}>
        {title}
      </Typography>
      <Divider sx={{ my: 5 }} />
      <BookDisplay books={loading ? skeletonBooks : books} loading={loading} />
    </Box>
  );
};

export default function TrendingPage(){
  const [booksData, setBooksData] = useState({
    trending: [],
    fiction: [],
    science: [],
    history: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchBooks = async () => {
    try {
      const [trending, fiction, science, history] = await Promise.all([
        getTrendingBooks(),
        getPopularFiction(), 
        getScienceTech(),
        getHistoryBiography()
      ]);
      setBooksData({ 
        trending: trending.data || [], 
        fiction: fiction.data || [], 
        science: science.data || [], 
        history: history.data || [] 
      });
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchBooks();
}, []);

  const sections = [
    { title: "Trending Books Today", books: booksData.trending, skeletonCount: 12 },
    { title: "Popular Fiction", books: booksData.fiction, skeletonCount: 6 },
    { title: "Science & Technology", books: booksData.science, skeletonCount: 6 },
    { title: "History & Biography", books: booksData.history, skeletonCount: 6 }
  ];

  return <Container maxWidth="lg" sx={{ my: 18 }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {sections.map((section, index) => (
        <Section 
          key={section.title} 
          title={section.title} 
          books={section.books} 
          isFirst={index === 0}
          loading={loading}
          skeletonCount={section.skeletonCount}
        />
      ))}
    </Box>
  </Container>
}