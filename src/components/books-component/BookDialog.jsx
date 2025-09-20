import { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography, Chip } from "@mui/material";
import { Star, TrendingUp, Close } from "@mui/icons-material";
import { styled } from "@mui/system";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    maxWidth: "500px",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: `0 8px 32px ${theme.palette.primary.main}20`
  }
}));

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: theme.spacing(1, 3),
  textTransform: "none",
  fontFamily: "var(--font-body)",
  transition: "all 0.3s ease"
}));

export default function BookDialog({ open, onClose, book }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const description = book?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
  
  const truncatedDescription = description.length > 150 
    ? description.substring(0, 150) + "..."
    : description;

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
        <Typography variant="h5" sx={{ fontFamily: "var(--font-heading)", color: "primary.main" }}>
          Book Details
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "var(--text-dark)" }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
          <Box
            sx={{
              width: 120,
              height: 160,
              backgroundColor: "#F9F7F1",
              borderRadius: "8px",
              flexShrink: 0
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontFamily: "var(--font-heading)", mb: 1, color: "text.primary" }}>
              {book?.title || "Book Title"}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: "text.secondary", fontFamily: "var(--font-body)" }}>
              by {book?.author || "Author Name"}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "text.secondary", fontFamily: "var(--font-body)" }}>
              Published: {book?.published || "2000"}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Star sx={{ fontSize: "1rem", color: "primary.main" }} />
              <Typography variant="body2" sx={{ color: "text.primary", fontFamily: "var(--font-body)" }}>
                {book?.rating || "4.5"}/5
              </Typography>
              <Chip
                icon={<TrendingUp sx={{ fontSize: "0.8rem" }} />}
                label="Trending"
                variant="outlined"
                size="small"
                sx={{
                  ml: 1,
                  borderColor: "primary.main",
                  color: "primary.main",
                  "& .MuiChip-icon": { color: "primary.main" },
                  fontFamily: "var(--font-body)"
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ fontFamily: "var(--font-heading)", mb: 2, color: "primary.main" }}>
            Description
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6, color: "text.primary", mb: 1, fontFamily: "var(--font-body)" }}>
            {showFullDescription ? description : truncatedDescription}
          </Typography>
          {description.length > 150 && (
            <Button
              onClick={() => setShowFullDescription(!showFullDescription)}
              sx={{
                p: 0,
                minWidth: "auto",
                color: "primary.main",
                textTransform: "none",
                fontSize: "0.875rem",
                fontWeight: 500
              }}
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </Button>
          )}
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}