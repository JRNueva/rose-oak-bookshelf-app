import React, { useState } from "react";
import { Typography, Button, Container, Box } from "@mui/material";
import { Shuffle } from "@mui/icons-material";
import { getRandomBooks } from "../api/bookService";
import BookDisplay from "../components/books-component/BookDisplay";

export default function RandomPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [error, setError] = useState('');

  const handleSurpriseMe = async () => {
    setLoading(true);
    setShowBooks(true);
    try {
      const result = await getRandomBooks();
      setBooks(result.data || []);
      setError('');
    } catch {
      setError('Failed to fetch random books. Please try again.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  if (showBooks) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, mt: 18 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography variant="h4" sx={{ color: "primary.main", fontWeight: 600 }}>
            Random Books
          </Typography>
          <Button
            variant="outlined"
            endIcon={<Shuffle />}
            onClick={handleSurpriseMe}
            sx={{
              borderColor: "primary.main",
              color: "primary.main",
              fontWeight: 500,
              "&:hover": { borderColor: "primary.dark", color: "primary.dark" }
            }}
          >
            Surprise Me Again
          </Button>
        </Box>
        {error && (
          <Typography variant="body1" sx={{ color: 'error.main', textAlign: 'center', mb: 2 }}>
            {error}
          </Typography>
        )}
        <BookDisplay books={books} loading={loading} />
      </Container>
    );
  }

  return (
    <Container
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 4
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{ color: "primary.main", fontWeight: 700, mb: 2 }}
      >
        Random Book Discovery
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        sx={{ color: "text.secondary", fontWeight: 500, mb: 3 }}
      >
        Explore a new world of stories with every click
      </Typography>
      <Button
        variant="contained"
        endIcon={<Shuffle />}
        sx={{
          backgroundColor: "primary.main",
          color: "background.paper",
          "&:hover": { backgroundColor: "primary.dark" }
        }}
        onClick={handleSurpriseMe}
        disabled={loading}
      >
        {loading ? "Loading..." : "Surprise Me"}
      </Button>
    </Container>
  );
}