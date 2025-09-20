import { Box } from "@mui/material";
import BookCard from "./BookCard";

export default function BookDisplay({ books = [], bookCount = 6 }) {
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
          <BookCard key={index} book={book} />
        ))
      ) : (
        Array.from({ length: bookCount }, (_, index) => (
          <BookCard key={index} />
        ))
      )}
    </Box>
  );
}