import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';

export default function SearchBar({ onSearch, onLocate, disabled, locating }) {
  // Controlled input: React state is the single source of truth for the text.
  const [city, setCity] = useState('');
  const [touched, setTouched] = useState(false);

  const trimmed = city.trim();
  const showError = touched && trimmed === '';

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched(true);
    if (trimmed === '') return;
    onSearch(trimmed);
    setCity('');
    setTouched(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}
    >
      <TextField
        fullWidth
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="Search for a city, e.g. Dehradun"
        error={showError}
        helperText={showError ? 'Please enter a city name.' : ' '}
        disabled={disabled}
        inputProps={{ 'aria-label': 'City name' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: { backgroundColor: 'background.paper' },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={disabled}
        sx={{ height: 56, px: 3 }}
      >
        Search
      </Button>
      <Tooltip title="Use my current location">
        <span>
          <IconButton
            onClick={onLocate}
            disabled={disabled || locating}
            aria-label="Use my current location"
            sx={{
              height: 56,
              width: 56,
              borderRadius: 2,
              border: 1,
              borderColor: 'divider',
              backgroundColor: 'background.paper',
            }}
          >
            {locating ? <CircularProgress size={22} /> : <MyLocationIcon />}
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}
