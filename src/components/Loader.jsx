import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

// Placeholder blocks shaped like the real content, so the layout does not jump.
export default function Loader() {
  return (
    <Box role="status" aria-label="Loading weather" sx={{ display: 'grid', gap: 2 }}>
      <Skeleton variant="rounded" height={220} />
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} variant="rounded" height={96} />
        ))}
      </Box>
      <Skeleton variant="rounded" height={170} />
    </Box>
  );
}
