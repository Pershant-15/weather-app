import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function UnitToggle({ unit, onChange }) {
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={unit}
      // MUI sends null when the active button is clicked again. Ignore that
      // so one unit is always selected.
      onChange={(_, next) => next && onChange(next)}
      aria-label="Temperature unit"
    >
      <ToggleButton value="metric" aria-label="Celsius" sx={{ px: 2 }}>
        °C
      </ToggleButton>
      <ToggleButton value="imperial" aria-label="Fahrenheit" sx={{ px: 2 }}>
        °f
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
