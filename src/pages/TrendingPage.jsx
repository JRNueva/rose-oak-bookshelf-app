import { Divider, Typography, Container, Box } from "@mui/material";
import { useState, useEffect } from "react";
import BookDisplay from "../components/books-component/BookDisplay";

import { getTrendingBooks, getPopularFiction, getScienceTech, getHistoryBiography } from "../api/bookService";


const Section = ({ title, books, isFirst }) => (
  <Box>
    <Typography variant="h5" component={isFirst ? "h1" : "h2"} sx={{ mb: 2, fontFamily: 'var(--font-heading)', color: 'primary.main' }}>
      {title}
    </Typography>
    <Divider sx={{ my: 5 }} />
    <BookDisplay books={books} />
  </Box>
);

export default function TrendingPage(){
  const [booksData, setBooksData] = useState({
    trending: [],
    fiction: [],
    science: [],
    history: []
  });

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
    }
  };
  fetchBooks();
}, []);


  const sections = [
    { title: "Trending Books Today", books: booksData.trending },
    { title: "Popular Fiction", books: booksData.fiction },
    { title: "Science & Technology", books: booksData.science },
    { title: "History & Biography", books: booksData.history }
  ];

  return (
    <Container maxWidth="lg" sx={{ my: 18 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sections.map((section, index) => (
          <Section key={section.title} title={section.title} books={section.books} isFirst={index === 0} />
        ))}
      </Box>
    </Container>
  );
}