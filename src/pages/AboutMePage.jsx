
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Profile from '../components/about-me-component/Profile';
import Information from '../components/about-me-component/Information';

export default function AboutMePage() {
  return <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 18
    }}>
        <Container
        maxWidth="lg"
        sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1.5fr' },
            gap: 5
        }}
        >

        <Profile />
        <Information />
        </Container>
    </Box>
}