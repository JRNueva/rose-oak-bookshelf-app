import { Box } from "@mui/material";
import BookCard from "./BookCard";

export default function BookDisplay({ books = [], loading = false, bookCount = 12 }) {
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: 'repeat(2, 1fr)',
        sm: 'repeat(4, 1fr)',
        md: 'repeat(4, 1fr)',
        lg: 'repeat(6, 1fr)'
      },
      mt: 5,
      gap: '24px 16px',
      justifyItems: 'center',
      rowGap: 4
    }}>
      {books.length > 0 ? (
        books.map((book, index) => (
          <BookCard key={book.id || index} book={book} loading={loading} />
        ))
      ) : (
        Array.from({ length: bookCount }, (_, index) => (
          <BookCard key={index} loading={true} />
        ))
      )}
    </Box>
  );
}