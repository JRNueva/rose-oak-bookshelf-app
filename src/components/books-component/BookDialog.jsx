import { useState, useEffect, useRef } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography, Chip, Rating } from "@mui/material";
import { TrendingUp, Close } from "@mui/icons-material";
import { styled } from "@mui/system";
import { getBookDetails } from "../../api/bookService";
import { CoverImageSkeleton, SubjectsSkeleton, DescriptionSkeleton } from "../skeleton/DialogSkeletons";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    maxWidth: "700px",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: `0 8px 32px ${theme.palette.primary.main}20`
  }
}));

const detailTextSx = { mb: 1, color: "text.secondary", fontFamily: "var(--font-body)" };
const headingSx = { fontFamily: "var(--font-heading)", color: "primary.main" };

export default function BookDialog({ open, onClose, book }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [needsReadMore, setNeedsReadMore] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const descriptionRef = useRef(null);
  
  useEffect(() => {
    if (open && book?.id) {
      const fetchDetails = async () => {
        setLoading(true);
        try {
          const result = await getBookDetails(book.id);
          setBookDetails(result.data);
        } catch (error) {
          console.error('Failed to fetch book details:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    }
  }, [open, book]);

  useEffect(() => {
    if (!open) {
      setShowFullDescription(false);
    }
  }, [open]);

  const description = typeof bookDetails?.description === 'string' 
    ? bookDetails.description 
    : bookDetails?.description?.value 
    || book?.description 
    || "No description available for this book.";
  const subjects = bookDetails?.subjects || book?.subjects || [];

  useEffect(() => {
    if (descriptionRef.current && !loading) {
      const element = descriptionRef.current;
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
      const maxHeight = lineHeight * 4;
      setNeedsReadMore(element.scrollHeight > maxHeight);
    }
  }, [description, loading]);

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
        <Typography variant="h5" sx={headingSx}>Book Details</Typography>
        <IconButton onClick={onClose}><Close /></IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", gap: 4, mb: 3 }}>
          <Box sx={{
            width: 190, height: 290, backgroundColor: "#F9F7F1", borderRadius: "8px", flexShrink: 0,
            position: "relative", overflow: "hidden"
          }}>
            {!imageLoaded && book?.coverImage && <CoverImageSkeleton />}
            {book?.coverImage && (
              <img 
                src={book.coverImage} 
                alt={book.title}
                onLoad={() => setImageLoaded(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: imageLoaded ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  position: "absolute",
                  top: 0,
                  left: 0
                }}
              />
            )}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ ...headingSx, mb: 1, color: "text.primary" }}>
              {book?.title || "Book Title"}
            </Typography>
            <Typography variant="body2" sx={detailTextSx}>Author: {book?.author || "Author Name"}</Typography>
            <Typography variant="body2" sx={{ ...detailTextSx, mb: 2 }}>Published: {book?.published || "2000"}</Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Rating 
                value={parseFloat(book?.rating || "4.5")} 
                readOnly 
                precision={0.1}
                sx={{ color: "primary.main" }}
              />
              <Typography variant="body2" sx={{ color: "text.primary", fontFamily: "var(--font-body)" }}>
                {book?.rating || "4.5"}
              </Typography>
              {book?.trendPosition && (
                <Chip icon={<TrendingUp sx={{ fontSize: "0.8rem" }} />} label={`#${book.trendPosition}`}
                  variant="outlined" size="small" sx={{
                    ml: 1, borderColor: "primary.main", color: "primary.main",
                    "& .MuiChip-icon": { color: "primary.main" }, fontFamily: "var(--font-body)"
                  }}
                />
              )}
            </Box>
            
            {loading ? (
              <SubjectsSkeleton />
            ) : (
              subjects && subjects.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ ...headingSx, mb: 1, fontSize: "0.875rem" }}>Subjects</Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {subjects.slice(0, 5).map((subject, index) => (
                      <Chip key={index} label={subject} size="small" variant="outlined" sx={{
                        borderColor: "primary.main", color: "text.primary", fontFamily: "var(--font-body)", fontSize: "0.75rem"
                      }} />
                    ))}
                  </Box>
                </Box>
              )
            )}
          </Box>
        </Box>

        {loading ? (
          <DescriptionSkeleton />
        ) : (
          <Box>
            <Typography variant="h6" sx={{ ...headingSx, mb: 2 }}>Description</Typography>
            <Typography 
              ref={descriptionRef}
              variant="body2" 
              sx={{ 
                lineHeight: 1.6, 
                color: "text.primary", 
                mb: 1, 
                fontFamily: "var(--font-body)",
                ...(!showFullDescription && {
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                })
              }}
            >
              {description}
            </Typography>
            {needsReadMore && (
              <Button onClick={() => setShowFullDescription(!showFullDescription)} sx={{
                p: 0, minWidth: "auto", color: "primary.main", textTransform: "none", fontSize: "0.875rem", fontWeight: 500
              }}>
                {showFullDescription ? "Read Less" : "Read More"}
              </Button>
            )}
          </Box>
        )}
      </DialogContent>
    </StyledDialog>
  );
}