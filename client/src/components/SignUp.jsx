import React, { useState } from 'react';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../redux/authSlice';

export default function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(formData));
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" mb={2}>Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" name="name" margin="normal" onChange={handleChange} />
        <TextField fullWidth label="Email" name="email" type="email" margin="normal" onChange={handleChange} />
        <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} />
        <role>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Already have an account? <a href="/signin">Sign In</a>
          </Typography>
          
        </role>
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          {isLoading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
      </form>
    </Box>
  );
}
