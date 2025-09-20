import { useState } from "react";
import { Box, Card, Typography, styled, Chip } from "@mui/material";
import { Star, TrendingUp } from "@mui/icons-material";
import { keyframes } from "@mui/system";
import BookDialog from "./BookDialog";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledCard = styled(Card)(() => ({
  width: 160,
  height: 240,
  margin: "6px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
  animation: `${fadeIn} 0.6s ease-out`,
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)"
  }
}));

export default function BookCard({ book }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
    <StyledCard onClick={handleCardClick} sx={{ cursor: "pointer" }}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#f0f0f0",
          backgroundImage: book?.coverImage ? `url(${book.coverImage})` : 'none',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative"
        }}
      >

        <Box sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 1,
          display: "flex",
          justifyContent: book?.trendPosition ? "space-between" : "right",
          alignItems: "center",
          background: "linear-gradient(transparent, rgba(62, 44, 35, 0.9))",
          transition: "opacity 0.3s ease",
          ".MuiCard-root:hover &": {
            opacity: 0
          }
        }}>
          {book?.trendPosition && (
            <Chip
              icon={<TrendingUp sx={{ fontSize: '0.7rem' }} />}
              label={`Trending # ${book.trendPosition}`}
              variant="outlined"
              size="small"
              sx={{
                fontSize: '0.6rem',
                height: 20,
                backgroundColor: 'rgba(249, 247, 241, 0.95)',
                borderColor: '#D4AF37',
                color: '#3E2C23'
              }}
            />
          )}
          <Box sx={{ display: 'flex', alignItems: 'right', gap: 0.2, color: 'white' }}>
            <Star sx={{ fontSize: '0.8rem', color: 'gold' }} />
            <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600 }}>
              {book?.rating || "4.5"}
            </Typography>
          </Box>
        </Box>

        <Box sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(62, 44, 35, 0.8)",
          color: "white",
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 1,
          opacity: 0,
          transition: "opacity 0.3s ease",
          ".MuiCard-root:hover &": {
            opacity: 1
          }
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.2,
              fontSize: (book?.title?.length || 0) > 30 ? '0.9rem' : '1.1rem'
            }}
          >
            {book?.title || "Book Title"}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            By {book?.author || "Author Name"}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Published on {book?.published || "2000"}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
            <Typography variant="body2">
              Rating {book?.rating || "4.5"} / 5
            </Typography>
          </Box>
          <Typography 
            variant="caption" 
            sx={{ 
              textAlign: 'center', 
              opacity: 0.8, 
              fontSize: '0.7rem',
              mt: 1
            }}
          >
            Click to see more
          </Typography>
        </Box>
      </Box>
    </StyledCard>
    <BookDialog 
      open={dialogOpen} 
      onClose={handleDialogClose} 
      book={book} 
    />
    </>
  );
}