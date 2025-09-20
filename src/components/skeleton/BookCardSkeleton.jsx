import { Skeleton } from "@mui/material";

export default function BookCardSkeleton() {
  return (
    <Skeleton 
      variant="rectangular" 
      width={160} 
      height={240} 
      sx={{ 
        borderRadius: "12px",
        backgroundColor: "rgba(0,0,0,0.1)"
      }} 
    />
  );
}