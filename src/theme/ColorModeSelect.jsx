import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function ColorModeSelect({ isDarkMode, setIsDarkMode, ...props }) {
  const currentMode = isDarkMode ? 'dark' : 'light';
  
  const handleChange = (event) => {
    const newMode = event.target.value;
    setIsDarkMode(newMode === 'dark');
  };

  return (
    <Select
      value={currentMode}
      onChange={handleChange}
      {...props}
    >
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
}