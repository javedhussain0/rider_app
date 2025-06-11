import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
  backgroundColor: '#000',
  color: theme.palette.grey[300],
  padding: theme.spacing(6, 2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 10),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  color: theme.palette.common.white,
}));

const FooterLink = styled(Link)(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(1),
  color: theme.palette.grey[400],
  textDecoration: 'none',
  fontSize: '0.875rem',
  '&:hover': {
    color: theme.palette.common.white,
  },
}));

const SocialContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  flexWrap: 'wrap',
}));

const BadgeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
  flexWrap: 'wrap',
}));

const LocaleInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
  color: theme.palette.grey[400],
  flexWrap: 'wrap',
}));

const Footer = () => {
  const navigate = useNavigate();
  const handleLinkClick = (event) => {
    event.preventDefault();
    navigate(event.currentTarget.getAttribute('href'));
  };
  return (
    <FooterRoot>
      <Grid container spacing={4}>
        {/* Left Side: Logo + Help */}
        <Grid item xs={12} md={4}>
          <Box>
            <Typography variant="h5" fontWeight={700} color="white" gutterBottom>
              CitiConnect
            </Typography>
            <Typography onClick={()=>navigate('help#')} variant="body2" sx={{ mt: 1, color: 'grey.400' }}>
              Visit Help Center
            </Typography>
          </Box>
        </Grid>

        {/* Right Side: Links */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            {[
              { title: 'Company', links: ['About us', 'Our offerings', 'Newsroom', 'Investors', 'Blog', 'Careers'] },
              { title: 'Products', links: ['Ride', 'Drive', 'Eat', 'Business', 'Freight', 'Gift cards', 'Health'] },
              { title: 'Global citizenship', links: ['Safety', 'Sustainability'] },
              { title: 'Travel', links: ['Reserve', 'Airports', 'Cities'] },
            ].map((section) => (
              <Grid item xs={6} sm={3} key={section.title}>
                <SectionTitle variant="subtitle1">{section.title}</SectionTitle>
                {section.links.map((text) => (
                  <FooterLink key={text} href="#">{text}</FooterLink>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ backgroundColor: '#333', my: 4 }} />

      {/* Social + Badges + Locale Info */}
      <Box textAlign="center">
        <SocialContainer>
          {[FacebookIcon, TwitterIcon, YouTubeIcon, LinkedInIcon, InstagramIcon].map((Icon, i) => (
            <IconButton key={i} aria-label={Icon.name} sx={{ color: 'grey.400' }}>
              <Icon />
            </IconButton>
          ))}
        </SocialContainer>

        <BadgeContainer>
          <Box component="img" src={googlePlay} alt="Get it on Google Play" sx={{ height: 45 }} />
          <Box component="img" src={appStore} alt="Download on the App Store" sx={{ height: 45 }} />
        </BadgeContainer>

        <LocaleInfo>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LanguageIcon fontSize="small" />
            <Typography variant="body2">English</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">India</Typography>
          </Box>
        </LocaleInfo>
      </Box>
    </FooterRoot>
  );
};

export default Footer;
