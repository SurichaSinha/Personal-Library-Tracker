import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Tooltip, TextField, InputAdornment } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchIcon from '@mui/icons-material/Search';

function Navbar({ mode, toggleMode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchUsername, setSearchUsername] = useState('');

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/login');
    }
  };

  const handleProfileSearch = (e) => {
    e.preventDefault();
    if (searchUsername.trim()) {
      navigate(`/profile/${searchUsername.trim()}`);
      setSearchUsername('');
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          Personal Library Tracker
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/books">
              My Books
            </Button>
            <Button color="inherit" component={Link} to="/google-books">
              Google Books
            </Button>
            <Button color="inherit" component={Link} to={`/profile/${user.username}`}>
              Profile
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
        {/* Username search */}
        <form onSubmit={handleProfileSearch} style={{ display: 'flex', alignItems: 'center', marginLeft: 16 }}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="View user..."
            value={searchUsername}
            onChange={e => setSearchUsername(e.target.value)}
            sx={{ minWidth: 120, bgcolor: 'background.paper', borderRadius: 1, mr: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" size="small">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
        <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          <IconButton color="inherit" onClick={toggleMode} sx={{ ml: 1 }}>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;