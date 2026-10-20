import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PlaceIcon from '@mui/icons-material/Place';
import {
  capitalize,
  formatLocalDate,
  formatLocalTime,
  iconUrl,
  toDisplayTemp,
  unitSymbol,
} from '../utils/formatters.js';

export default function WeatherCard({ current, unit }) {
  const { name, sys, main, weather, dt, timezone } = current;
  const condition = weather[0];

  return (
    <Card>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
          <PlaceIcon fontSize="small" />
          <Typography variant="body2">
            {formatLocalDate(dt, timezone)} · {formatLocalTime(dt, timezone)} local time
          </Typography>
        </Box>

        <Typography variant="h2" component="h2" sx={{ fontSize: { xs: 28, sm: 36 }, mt: 0.5 }}>
          {name}, {sys.country}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            mt: 2,
          }}
        >
          <Box>
            <Typography
              variant="h1"
              component="p"
              sx={{ fontSize: { xs: 72, sm: 96 }, lineHeight: 1 }}
            >
              {toDisplayTemp(main.temp, unit)}
              <Box component="span" sx={{ fontSize: '0.4em', color: 'primary.main', ml: 0.5 }}>
                {unitSymbol(unit)}
              </Box>
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Feels like {toDisplayTemp(main.feels_like, unit)}
              {unitSymbol(unit)} · High {toDisplayTemp(main.temp_max, unit)}° · Low{' '}
              {toDisplayTemp(main.temp_min, unit)}°
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Box
              component="img"
              src={iconUrl(condition.icon)}
              alt={condition.description}
              sx={{ width: 120, height: 120 }}
            />
            <Typography variant="h6" component="p" sx={{ mt: -1 }}>
              {capitalize(condition.description)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
