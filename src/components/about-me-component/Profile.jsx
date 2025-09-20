import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import profileImg from "../../assets/profile.jpg";

export default function Profile(){
    return         <Box sx={{
          textAlign: 'center',
          borderRight: { md: 1 },
          borderColor: 'divider',
          pr: { md: 6 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: { xs: 4, md: 0 },
          mt: 5
        }}>
          <Avatar
            src={profileImg}
            sx={{
              width: 300,
              height: 300,
              mb: 4,
              border: 3,
              borderColor: 'primary.main'
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Palatino Linotype, Book Antiqua, Palatino, serif',
              fontWeight: 700,
              fontSize: '1.5rem',
              mb: 1,
              letterSpacing: 1.5
            }}
          >
            Joanne Rose R. Nueva
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              fontSize: '1.15rem', 
              mb: 3,
              color: 'text.secondary',
              fontStyle: 'italic',
              letterSpacing: 0.8
            }}
          >
            Aspiring Full-Stack Developer
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1rem', 
              maxWidth: 280,
              lineHeight: 1.7,
              borderLeft: 3,
              borderColor: 'primary.main',
              pl: 2,
              color: 'text.secondary',
              fontFamily: 'Palatino Linotype, Book Antiqua, Palatino, serif'
            }}
          >
            Aspiring full-stack developer with a foundation in React, Node.js, and Express. Passionate about building scalable applications and contributing to impactful projects.             
            </Typography>
        </Box>
}