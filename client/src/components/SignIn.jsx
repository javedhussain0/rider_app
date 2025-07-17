import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
  ThemeProvider,
  createTheme,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Nav from "../components/nav"

const sideImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYtscEMI0JxlZuSiuHrow4TvnIzXyIOGwdMew0_DtKyti3xwu_Sv8R5an7EhO7bM6rsGyygL_luy7zpn0bmJXaJuQb2BLtuSdNEPHSq1Va_FZyOHo6G547BwbHWt-SCm5QLQAMOhBzVVxX6w9qcD2CyaJMl_9wxCsfixRNnVrf5PIFN5yUfJfBJ4tl3zgXPBnDZ0XjpwX7TatNp7H-QO2lmCRa3FyXxervHic-Rs7qQCeJz6TB7Y2sQ_yqbvgOM3sMsg_xOxbO-8o';

const theme = createTheme({
  typography: {
    fontFamily: '"Space Grotesk", "Noto Sans", sans-serif',
  },
  palette: {
    primary: {
      main: '#0c77f2',
    },
    text: {
      primary: '#0d141c',
      secondary: '#49709c',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
});

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 0 4px rgba(0,0,0,0.1)',
  borderRadius: '12px',
  width: '100%',
  maxWidth: 450,
}));

const FormTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.default,
    borderRadius: '12px',
    height: '56px',
    '& fieldset': {
      borderColor: '#cedae8',
    },
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
  },
  '& .MuiInputLabel-root': {
    color: '#49709c',
  },
  marginBottom: theme.spacing(2),
}));

const SignInButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  height: '40px',
  fontWeight: 'bold',
  textTransform: 'none',
  fontSize: '0.875rem',
  marginTop: theme.spacing(2),
}));

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Sign in failed');
      const data = await response.json();
      alert('Sign in successful!');
    } catch (error) {
      alert('Sign in failed. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          backgroundColor: 'background.default',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Left - Image */}
        <Box
          sx={{
            flex: 1,
            minHeight: { xs: '200px', md: '100vh' },
            backgroundImage: `url(${sideImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Right - Form */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
          }}
        >
          <FormContainer>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Welcome back
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormTextField
                fullWidth
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonIcon sx={{ color: '#49709c' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <FormTextField
                fullWidth
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockIcon sx={{ color: '#49709c' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Link href="#" color="text.secondary" underline="always">
                  Forgot Password?
                </Link>
                <Link href="/SignUp" color="text.secondary" underline="always">
                  Don't have an account? Sign Up
                </Link>
              </Box>
              <SignInButton fullWidth type="submit" variant="contained" color="primary">
                Sign In
              </SignInButton>
            </form>
          </FormContainer>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SignInPage;
