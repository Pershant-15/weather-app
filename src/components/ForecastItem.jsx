import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { colors } from '../theme/darkTheme.js';
import { capitalize, formatWeekday, iconUrl, toDisplayTemp } from '../utils/formatters.js';

export default function ForecastItem({ day, unit, timezone }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        p: 2,
        borderRadius: 2,
        backgroundColor: colors.surfaceRaised,
        border: `1px solid ${colors.border}`,
      }}
    >
      <Typography fontWeight={600}>{formatWeekday(day.dt, timezone)}</Typography>
      <Box
        component="img"
        src={iconUrl(day.icon)}
        alt={day.description}
        sx={{ width: 64, height: 64 }}
      />
      <Typography variant="caption" color="text.secondary" component="p" sx={{ minHeight: 18 }}>
        {capitalize(day.description)}
      </Typography>
      <Typography sx={{ mt: 1 }}>
        <Box component="span" fontWeight={700}>
          {toDisplayTemp(day.max, unit)}°
        </Box>{' '}
        <Box component="span" color="text.secondary">
          {toDisplayTemp(day.min, unit)}°
        </Box>
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
          mt: 0.5,
          color: 'primary.main',
        }}
      >
        <WaterDropIcon sx={{ fontSize: 14 }} />
        <Typography variant="caption">{day.rainChance}%</Typography>
      </Box>
    </Box>
  );
}
