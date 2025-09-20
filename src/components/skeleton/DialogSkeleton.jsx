import { Box, Skeleton } from "@mui/material";

export function CoverImageSkeleton() {
  return (
    <Skeleton 
      variant="rectangular" 
      width={190} 
      height={290} 
      sx={{ 
        borderRadius: "8px", 
        flexShrink: 0,
        bgcolor: 'action.hover'
      }} 
    />
  );
}

export function SubjectsSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width={80} height={20} sx={{ mb: 1, bgcolor: 'action.hover' }} />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} variant="rounded" width={60} height={24} sx={{ bgcolor: 'action.hover' }} />
        ))}
      </Box>
    </Box>
  );
}

export function DescriptionSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width={100} height={24} sx={{ mb: 2, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
      <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
      <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
      <Skeleton variant="text" width="80%" height={20} sx={{ bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
    </Box>
  );
}