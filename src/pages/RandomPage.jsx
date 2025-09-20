import React, { useState } from "react";
import { Typography, Button, Container, Box } from "@mui/material";
import { Shuffle } from "@mui/icons-material";
import { getRandomBooks } from "../api/bookService";
import BookDisplay from "../components/books-component/BookDisplay";

export default function RandomPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBooks, setShowBooks] = useState(false);

  const handleSurpriseMe = async () => {
    setLoading(true);
    setShowBooks(true);
    try {
      const result = await getRandomBooks();
      setBooks(result.data || []);
    } catch (error) {
      console.error('Failed to fetch random books:', error);
    } finally {
      setLoading(false);
    }
  };

  if (showBooks) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, mt: 18 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography variant="h4" sx={{ color: "#D4AF37", fontWeight: 600 }}>
            Random Books
          </Typography>
          <Button
            variant="outlined"
            endIcon={<Shuffle />}
            onClick={handleSurpriseMe}
            sx={{
              borderColor: "#D4AF37",
              color: "#D4AF37",

              fontWeight: 500,
              "&:hover": { borderColor: "#B8941F", color: "#B8941F" }
            }}
          >
            Surprise Me Again
          </Button>
        </Box>
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
        sx={{ color: "#D4AF37", fontWeight: 700, mb: 2 }}
      >
        Random Book Discovery
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        sx={{ color: "#6B4C3B", fontWeight: 500, mb: 3 }}
      >
        Explore a new world of stories with every click
      </Typography>
      <Button
        variant="contained"
        endIcon={<Shuffle />}
        sx={{
          backgroundColor: "#D4AF37",
          color: "white",

          "&:hover": { backgroundColor: "#B8941F" }
        }}
        onClick={handleSurpriseMe}
        disabled={loading}
      >
        {loading ? "Loading..." : "Surprise Me"}
      </Button>
    </Container>
  );
}