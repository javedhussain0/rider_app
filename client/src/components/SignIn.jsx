import React, { useState } from 'react';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../redux/authSlice';

export default function SignIn() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(credentials));
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" mb={2}>Sign In</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Email" name="email" type="email" margin="normal" onChange={handleChange} />
        <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          {isLoading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </form>
    </Box>
  );
}
