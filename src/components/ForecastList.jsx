import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ForecastItem from './ForecastItem.jsx';

export default function ForecastList({ forecast, unit, timezone }) {
  if (forecast.length === 0) return null;

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
          5-day forecast
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 1.5,
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(5, 1fr)',
            },
          }}
        >
          {forecast.map((day) => (
            <ForecastItem key={day.dt} day={day} unit={unit} timezone={timezone} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
