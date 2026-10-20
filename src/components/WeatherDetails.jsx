import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import SpeedIcon from '@mui/icons-material/Speed';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudIcon from '@mui/icons-material/Cloud';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { colors } from '../theme/darkTheme.js';
import {
  formatLocalTime,
  formatVisibility,
  formatWind,
  windDirection,
} from '../utils/formatters.js';

function DetailTile({ icon, label, value }) {
  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, backgroundColor: colors.surface, borderColor: 'divider' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
        {icon}
        <Typography variant="body2">{label}</Typography>
      </Box>
      <Typography variant="h6" component="p" sx={{ mt: 1, fontWeight: 600 }}>
        {value}
      </Typography>
    </Paper>
  );
}

export default function WeatherDetails({ current, unit }) {
  const { main, wind, visibility, clouds, sys, timezone } = current;

  const tiles = [
    { label: 'Humidity', value: `${main.humidity}%`, icon: <WaterDropIcon fontSize="small" /> },
    {
      label: 'Wind',
      value: `${formatWind(wind.speed, unit)} ${windDirection(wind.deg ?? 0)}`,
      icon: <AirIcon fontSize="small" />,
    },
    { label: 'Pressure', value: `${main.pressure} hPa`, icon: <SpeedIcon fontSize="small" /> },
    {
      label: 'Visibility',
      value: formatVisibility(visibility ?? 0, unit),
      icon: <VisibilityIcon fontSize="small" />,
    },
    { label: 'Cloud cover', value: `${clouds.all}%`, icon: <CloudIcon fontSize="small" /> },
    {
      label: 'Sunrise',
      value: formatLocalTime(sys.sunrise, timezone),
      icon: <WbTwilightIcon fontSize="small" />,
    },
    {
      label: 'Sunset',
      value: formatLocalTime(sys.sunset, timezone),
      icon: <NightsStayIcon fontSize="small" />,
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
      }}
    >
      {tiles.map((tile) => (
        <DetailTile key={tile.label} {...tile} />
      ))}
    </Box>
  );
}
