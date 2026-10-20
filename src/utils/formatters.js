export const toDisplayTemp = (celsius, unit) =>
  Math.round(unit === 'metric' ? celsius : (celsius * 9) / 5 + 32);

export const unitSymbol = (unit) => (unit === 'metric' ? '°C' : '°F');

export const formatWind = (metersPerSecond, unit) =>
  unit === 'metric'
    ? `${Math.round(metersPerSecond * 3.6)} km/h`
    : `${Math.round(metersPerSecond * 2.23694)} mph`;

export const formatVisibility = (meters, unit) =>
  unit === 'metric'
    ? `${(meters / 1000).toFixed(1)} km`
    : `${(meters / 1609.34).toFixed(1)} mi`;

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
export const windDirection = (degrees) => DIRECTIONS[Math.round(degrees / 45) % 8];

// OpenWeatherMap timestamps are UTC seconds. Shifting by the city's own offset
// and reading the result as UTC shows the time as it is in that city.
const shifted = (unixSeconds, timezoneOffset) => new Date((unixSeconds + timezoneOffset) * 1000);

export const formatLocalTime = (unixSeconds, timezoneOffset) =>
  shifted(unixSeconds, timezoneOffset).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  });

export const formatLocalDate = (unixSeconds, timezoneOffset) =>
  shifted(unixSeconds, timezoneOffset).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

export const formatWeekday = (unixSeconds, timezoneOffset) =>
  shifted(unixSeconds, timezoneOffset).toLocaleDateString('en-US', {
    weekday: 'short',
    timeZone: 'UTC',
  });

export const capitalize = (text = '') => text.charAt(0).toUpperCase() + text.slice(1);

export const iconUrl = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

// The forecast endpoint returns a reading every 3 hours. Group them by the
// city's local calendar day and reduce each day to one summary row.
export function summarizeForecast(list, timezoneOffset) {
  const days = new Map();

  list.forEach((entry) => {
    const local = shifted(entry.dt, timezoneOffset);
    const key = local.toISOString().slice(0, 10);
    if (!days.has(key)) days.set(key, []);
    days.get(key).push({ ...entry, hour: local.getUTCHours() });
  });

  return Array.from(days.values())
    .slice(0, 5)
    .map((entries) => {
      const midday = entries.reduce((best, entry) =>
        Math.abs(entry.hour - 12) < Math.abs(best.hour - 12) ? entry : best
      );
      return {
        dt: midday.dt,
        min: Math.min(...entries.map((e) => e.main.temp_min)),
        max: Math.max(...entries.map((e) => e.main.temp_max)),
        icon: midday.weather[0].icon,
        description: midday.weather[0].description,
        rainChance: Math.round(Math.max(...entries.map((e) => e.pop ?? 0)) * 100),
      };
    });
}
