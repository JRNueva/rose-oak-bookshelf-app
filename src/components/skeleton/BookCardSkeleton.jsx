import { Skeleton } from "@mui/material";

export default function BookCardSkeleton() {
  return (
    <Skeleton 
      variant="rectangular" 
      width="160px" 
      height="240px" 
      sx={{ 
        borderRadius: "12px",
        bgcolor: 'action.hover'
      }} 
    />
  );
}