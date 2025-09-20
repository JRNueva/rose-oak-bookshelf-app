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
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    try {
      const result = await searchBooks(query);
      setBooks(result.data || []);
      setError('');
    } catch {
      setError('Failed to search books. Please try again.');
      setBooks([]);
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
        sx={{ color: "primary.main", fontWeight: 700, mb: 2 }}
      >
        Browse Books
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        sx={{ color: "text.secondary", fontWeight: 500, mb: 4 }}
      >
        Search through our vast collection of books
      </Typography>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for books, authors, or subjects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{
          maxWidth: 600,
          mb: hasSearched ? 4 : 0,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "primary.main",
            },
            "&:hover fieldset": {
              borderColor: "primary.dark",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdor nment position="start">
              <Search sx={{ color: "primary.main" }} />
            </InputAdor>
          ),
        }}
      />
      
      {hasSearched && (
        <Container maxWidth="lg" sx={{ width: "100%", textAlign: "left" }}>
          {error && (
            <Typography variant="body1" sx={{ color: 'error.main', textAlign: 'center', mt: 2 }}>
              {error}
            </Typography>
          )}
          {!loading && !error && books.length === 0 ? (
            <Typography 
              variant="h6" 
              sx={{ 
                color: "text.secondary", 
                textAlign: "center", 
                mt: 4 
              }}
            >
              No results found. Try a different search term.
            </Typography>
          ) : (
            <BookDisplay books={books} loading={loading} />
          )}
        </Container>
      )}
    </Container>
  );
}