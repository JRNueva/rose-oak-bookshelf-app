import React, { useState } from "react";
import { Typography, Container, TextField, InputAdornment, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import { searchBooks } from "../api/bookService";
import BookDisplay from "../components/books-component/BookDisplay";

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    try {
      const result = await searchBooks(query);
      setBooks(result.data || []);
    } catch (error) {
      console.error('Failed to search books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: hasSearched ? "flex-start" : "center",
        alignItems: "center",
        textAlign: "center",
        padding: 4,
        pt: hasSearched ? 20 : 4
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{ color: "#D4AF37", fontWeight: 700, mb: 2 }}
      >
        Browse Books
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        sx={{ color: "#6B4C3B", fontWeight: 500, mb: 4 }}
      >
        Search through our vast collection of books
      </Typography>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for books, authors, or subjects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{
          maxWidth: 600,
          mb: hasSearched ? 4 : 0,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#D4AF37",
            },
            "&:hover fieldset": {
              borderColor: "#B8941F",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#D4AF37",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: "#D4AF37" }} />
            </InputAdornment>
          ),
        }}
      />
      
      {hasSearched && (
        <Box sx={{ width: "100%", maxWidth: "lg" }}>
          <BookDisplay books={books} loading={loading} />
        </Box>
      )}
    </Container>
  );
}