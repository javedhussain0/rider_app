import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const sideImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBgjgAaUTFpMK2AXItbaWv80dvNtC08f2GBycrTi6lfwco_t-qEy9oFrAG-3VqRuf6Rv8MgQmzH9m8iveurFBph_u9wDwRkRvNj3DhTRFTrFtwjVhVXWw5RPo6oTGOGS0qdI95NrDGNcP_yOVZE5sHPvsJRXAAgkinNZYHRG3UvMplhzvFEeuSnMMdFARjiCRQI08Jtu5UKWbzs7OEAPqTe-WdE21zNP3YMduYpWtj9F-oxcMipSLYz40EvYWw-KzmRHXjMA0idLII';

const theme = createTheme({
  typography: {
    fontFamily: '"Space Grotesk", "Noto Sans", sans-serif',
  },
  palette: {
    primary: {
      main: '#0c77f2',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0d141c',
      secondary: '#49709c',
    },
  },
});

const InputField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f0f4f9',
    borderRadius: 10,
    '& fieldset': {
      border: 'none',
    },
  },
  marginBottom: theme.spacing(2),
}));

const SignUpButton = styled(Button)(({ theme }) => ({
  borderRadius: 10,
  height: 45,
  fontWeight: 'bold',
  textTransform: 'none',
  marginTop: theme.spacing(2),
}));

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Signup failed');

      const data = await response.json();
      console.log('Success:', data);
      alert('Signup successful!');
    } catch (error) {
      console.error('Error:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          backgroundColor: 'background.default',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Left Image */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${sideImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: { md: '0 0 0 12px' },
            minHeight: 300,
          }}
        />

        {/* Right Form */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Create your account
            </Typography>

            <form onSubmit={handleSubmit}>
              <InputField
                fullWidth
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <InputField
                fullWidth
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              <InputField
                fullWidth
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <InputField
                fullWidth
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <InputField
                fullWidth
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <SignUpButton fullWidth type="submit" variant="contained">
                Sign Up
              </SignUpButton>
            </form>

            <Typography
              variant="body2"
              sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}
            >
              Already have an account?{' '}
              <Link href="/SignIn" underline="always">
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SignUp;
