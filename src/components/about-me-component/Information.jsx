import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';

const skills = [
  'Python', 'Agile Project Management', 'Web Development',
  'Mobile Application Development', 'Java Development',
  'Angular', 'Spring Boot', 'React.js', 'SQL'
];

export default function Information() {
  return <Box sx={{
      pl: { md: 6 },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: '1.25rem',
            mb: 3,
            letterSpacing: 1.2,
            fontFamily: 'Palatino Linotype, Book Antiqua, Palatino, serif'
          }}
        >
          Skills
        </Typography>
        <Divider sx={{ mt: 3, mb: 5 }} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.75 }}>
          {skills.map((skill, index) => (
            <Chip
              key={index}
              variant="outlined"
              color="secondary"
              icon={<CodeIcon />}
              label={skill}
              sx={{
                px: 2,
                py: 1,
                fontSize: '1rem',
                fontWeight: 600,
                border: 1,
                borderColor: 'secondary.main',
                backgroundColor: 'background.paper',
                color: 'text.secondary',
                fontFamily: 'Palatino Linotype, Book Antiqua, Palatino, serif',
                '& .MuiChip-icon': {
                  color: 'text.secondary'
                }
              }}
            />
          ))}
        </Box>
      </Box>
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: '1.25rem',
            mb: 3,
            letterSpacing: 1.2,
            fontFamily: 'Palatino Linotype, Book Antiqua, Palatino, serif'
          }}
        >
          Featured Project
        </Typography>
        <Divider sx={{ mt: 3, mb: 5 }} />
        <Typography
          variant="body1"
          sx={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'text.secondary',
            fontFamily: 'Palatino Linotype, Book Antiqua, Palatino, serif'
          }}
        >
          <strong>Rose & Oak Bookshelf</strong> — A modern, minimal book discovery app built with React and Material-UI. It features trending books, search and browse functionality, random book generation, and an about page.
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: '1.25rem',
            mb: 3,
            letterSpacing: 1.2,
            fontFamily: 'Palatino Linotype, Book Antiqua, Palatino, serif'
          }}
        >
          Contact
        </Typography>
        <Divider sx={{ mt: 3, mb: 5 }} />
        <Box sx={{ display: 'flex', gap: 4, justifyContent: { xs: 'center', md: 'flex-start' } }}>
          <IconButton
            href="mailto:joannenueva13@gmail.com"
            aria-label="Email"
            sx={{
              color: 'primary.main',
              width: 'auto',
              height: 'auto',
              border: 'none',
              background: 'none',
              p: 0,
              '&:hover': {
                color: 'primary.dark',
                background: 'none',
                border: 'none'
              }
            }}
          >
            <EmailIcon sx={{ fontSize: '1.75rem' }} />
          </IconButton>
          <IconButton
            href="tel:+639431413134"
            aria-label="Phone"
            sx={{
              color: 'primary.main',
              border: 'none',
              background: 'none',
              width: 'auto',
              height: 'auto',
              p: 0,
              '&:hover': {
                color: 'primary.dark',
                background: 'none',
                border: 'none'
              }
            }}
          >
            <PhoneIcon sx={{ fontSize: '1.75rem' }} />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com/in/jrnueva/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            sx={{
              color: 'primary.main',
              border: 'none',
              background: 'none',
              width: 'auto',
              height: 'auto',
              p: 0,
              '&:hover': {
                color: 'primary.dark',
                background: 'none',
                border: 'none'
              }
            }}
          >
            <LinkedInIcon sx={{ fontSize: '1.75rem' }} />
          </IconButton>
          <IconButton
            href="https://github.com/JRNueva"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            sx={{
              color: 'primary.main',
              border: 'none',
              background: 'none',
              width: 'auto',
              height: 'auto',
              p: 0,
              '&:hover': {
                color: 'primary.dark',
                background: 'none',
                border: 'none'
              }
            }}
          >
            <GitHubIcon sx={{ fontSize: '1.75rem' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
}