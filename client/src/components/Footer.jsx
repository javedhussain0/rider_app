// src/components/Footer.jsx
import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import googlePlay from '../assets/footer/PlayStore.png';
import appStore from '../assets/footer/AppStote.png';

const FooterRoot = styled('footer')(({ theme }) => ({
  backgroundColor: 'black' ,
  color: theme.palette.common.white,
  padding: theme.spacing(6, 3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 10),
  },
}));

const SectionTitle = styled(Typography)({
  fontWeight: 600,
  marginBottom: 8,
});

const FooterLink = styled(Link)(({ theme }) => ({
  display: 'block',
  marginBottom: 4,
  color: theme.palette.grey[300],
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.common.white,
  },
}));

const SocialContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: 16,
  margin: '32px 0 16px',
});

const BadgeContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: 16,
  marginTop: 16,
});

const Footer = () => {
  return (
    <FooterRoot>
      <Typography variant="h5" gutterBottom>
        Citiconnect
      </Typography>
      <Typography variant="body2" gutterBottom>
        Visit Help Center
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={6} md={3}>
          <SectionTitle variant="subtitle1">Company</SectionTitle>
          {['About us', 'Our offerings', 'Newsroom', 'Investors', 'Blog', 'Careers'].map((text) => (
            <FooterLink key={text} href="#">{text}</FooterLink>
          ))}
        </Grid>

        <Grid item xs={6} md={3}>
          <SectionTitle variant="subtitle1">Products</SectionTitle>
          {['Ride', 'Drive', 'Eat', 'Business', 'Freight', 'Gift cards', 'Health'].map((text) => (
            <FooterLink key={text} href="#">{text}</FooterLink>
          ))}
        </Grid>

        <Grid item xs={6} md={3}>
          <SectionTitle variant="subtitle1">Global citizenship</SectionTitle>
          {['Safety', 'Sustainability'].map((text) => (
            <FooterLink key={text} href="#">{text}</FooterLink>
          ))}
        </Grid>

        <Grid item xs={6} md={3}>
          <SectionTitle variant="subtitle1">Travel</SectionTitle>
          {['Reserve', 'Airports', 'Cities'].map((text) => (
            <FooterLink key={text} href="#">{text}</FooterLink>
          ))}
        </Grid>
      </Grid>

      <SocialContainer>
        <IconButton aria-label="Facebook" sx={{ color: 'grey.300' }}>
          <FacebookIcon />
        </IconButton>
        <IconButton aria-label="Twitter" sx={{ color: 'grey.300' }}>
          <TwitterIcon />
        </IconButton>
        <IconButton aria-label="YouTube" sx={{ color: 'grey.300' }}>
          <YouTubeIcon />
        </IconButton>
        <IconButton aria-label="LinkedIn" sx={{ color: 'grey.300' }}>
          <LinkedInIcon />
        </IconButton>
        <IconButton aria-label="Instagram" sx={{ color: 'grey.300' }}>
          <InstagramIcon />
        </IconButton>
      </SocialContainer>

      <BadgeContainer>
        <Box component="img" src={googlePlay} alt="Get it on Google Play" sx={{ height: 40 }} />
        <Box component="img" src={appStore} alt="Download on the App Store" sx={{ height: 40 }} />
      </BadgeContainer>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
          mt: 4,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LanguageIcon fontSize="small" />
          <Typography variant="body2">English</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2">India</Typography>
        </Box>
      </Box>
    </FooterRoot>
  );
};

export default Footer;
