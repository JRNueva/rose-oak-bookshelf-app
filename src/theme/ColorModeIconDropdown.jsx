import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import IconButton from '@mui/material/IconButton';

export default function ColorModeToggleButton({ isDarkMode, setIsDarkMode, ...props }) {
  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <IconButton
      onClick={handleToggle}
      size="small"
      color="inherit"
      {...props}
    >
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}