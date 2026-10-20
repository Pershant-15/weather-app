import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function ErrorAlert({ title = 'Something went wrong', message, severity = 'error' }) {
  return (
    <Alert severity={severity} variant="outlined" sx={{ backgroundColor: 'background.paper' }}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
}
