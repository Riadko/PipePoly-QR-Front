import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Product Management
      </Typography>
      <Button color="inherit" component={Link} to="/">Home</Button>
      <Button color="inherit" component={Link} to="/add">Add Product</Button>
      <Button color="inherit" component={Link} to="/scan">Scan QR</Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
