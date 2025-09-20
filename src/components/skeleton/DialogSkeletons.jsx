import { Box, Skeleton } from "@mui/material";

export function CoverImageSkeleton() {
  return (
    <Skeleton 
      variant="rectangular" 
      width={190} 
      height={290} 
      sx={{ borderRadius: "8px", flexShrink: 0 }} 
    />
  );
}

export function SubjectsSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width={80} height={20} sx={{ mb: 1 }} />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} variant="rounded" width={60} height={24} />
        ))}
      </Box>
    </Box>
  );
}

export function DescriptionSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width={100} height={24} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="80%" height={20} />
    </Box>
  );
}