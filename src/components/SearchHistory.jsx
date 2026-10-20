import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HistoryIcon from '@mui/icons-material/History';

export default function SearchHistory({ history, onSelect, onRemove, onClear }) {
  if (history.length === 0) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 3 }}>
      <HistoryIcon fontSize="small" sx={{ color: 'text.secondary' }} />
      <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>
        Recent
      </Typography>
      {history.map((place) => (
        <Chip
          key={`${place.name}-${place.country}`}
          label={`${place.name}, ${place.country}`}
          onClick={() => onSelect(place)}
          onDelete={() => onRemove(place)}
          variant="outlined"
          sx={{ backgroundColor: 'background.paper' }}
        />
      ))}
      <Button size="small" color="inherit" onClick={onClear} sx={{ color: 'text.secondary' }}>
        Clear all
      </Button>
    </Box>
  );
}
