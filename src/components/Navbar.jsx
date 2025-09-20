import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../theme/ColorModeIconDropdown';
import Sitemark from './SitemarkIcon';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.palette.mode === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.3)' : (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

const menuItems = [
  { name: 'Trending', path: '/' },
  { name: 'Browse', path: '/browse-books' },
  { name: 'Random', path: '/random-books' },
  { name: 'About', path: '/about-me' }
];

export default function Navbar({ isDarkMode, setIsDarkMode }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleMenuClick = (item) => {
    navigate(item.path);
    setOpen(false);
  };

  const isActive = (path) => location.pathname === path || (location.pathname === '/' && path === '/trending');

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Sitemark />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, px: 2, pt: 1 }}>
              {menuItems.map((item) => (
                <Button 
                  key={item.name} 
                  variant="text" 
                  size="small"
                  onClick={() => handleMenuClick(item)}
                  sx={{ 
                    fontFamily: 'Open Sans, sans-serif',
                    color: isActive(item.path) ? (isDarkMode ? '#FFD700' : '#D4AF37') : (isDarkMode ? '#EDEDED' : '#2E2E2E'),
                    '&:hover': { color: isDarkMode ? '#FFD700' : '#D4AF37' }
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            <ColorModeIconDropdown isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                {menuItems.map((item) => (
                  <MenuItem 
                    key={item.name} 
                    onClick={() => handleMenuClick(item)}
                    sx={{ 
                      fontFamily: 'Open Sans, sans-serif',
                      color: isActive(item.path) ? (isDarkMode ? '#FFD700' : '#D4AF37') : (isDarkMode ? '#EDEDED' : '#2E2E2E')
                    }}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}