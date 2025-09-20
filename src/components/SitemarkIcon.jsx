import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import lightIcon from '../assets/light-icon.png';
import darkIcon from '../assets/dark-icon.png';

export default function Sitemark() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 1, gap: 1 }}>
      <Box component="img" src={isDark ? darkIcon : lightIcon} sx={{ width: 50, height: 40, mr: 1 }} />
      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'text.secondary', display: 'flex', alignItems: 'center', pt: 1 }}>
        Rose & Oaks Bookshelf
      </Typography>
    </Box>
  );
}