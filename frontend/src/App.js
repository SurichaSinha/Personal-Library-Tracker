import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BookFormPage from './pages/BookFormPage';
import BookListPage from './pages/BookListPage';
import ProfilePage from './pages/ProfilePage';
import GoogleBooksPage from './pages/GoogleBooksPage';
import Navbar from './components/Navbar';

// Import Google Fonts
const fontLink1 = document.createElement('link');
fontLink1.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap';
fontLink1.rel = 'stylesheet';
document.head.appendChild(fontLink1);
const fontLink2 = document.createElement('link');
fontLink2.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap';
fontLink2.rel = 'stylesheet';
document.head.appendChild(fontLink2);

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function getCustomTheme(mode) {
  return createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'dark' ? '#111827' : '#F3F4F6',
        paper: mode === 'dark' ? '#1F2937' : '#FFFFFF',
      },
      primary: {
        main: '#10B981',
        contrastText: mode === 'dark' ? '#E5E7EB' : '#111827',
      },
      secondary: {
        main: '#22D3EE',
        contrastText: mode === 'dark' ? '#111827' : '#111827',
      },
      text: {
        primary: mode === 'dark' ? '#E5E7EB' : '#111827',
        secondary: mode === 'dark' ? '#9CA3AF' : '#374151',
      },
    },
    typography: {
      fontFamily: 'Open Sans, sans-serif',
      h1: { fontFamily: 'Space Grotesk, sans-serif' },
      h2: { fontFamily: 'Space Grotesk, sans-serif' },
      h3: { fontFamily: 'Space Grotesk, sans-serif' },
      h4: { fontFamily: 'Space Grotesk, sans-serif' },
      h5: { fontFamily: 'Space Grotesk, sans-serif' },
      h6: { fontFamily: 'Space Grotesk, sans-serif' },
      body1: { fontFamily: 'Open Sans, sans-serif' },
      body2: { fontFamily: 'Open Sans, sans-serif' },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
          },
          containedPrimary: {
            backgroundColor: '#10B981',
            color: '#111827',
            '&:hover': {
              backgroundColor: '#059669',
            },
          },
          outlinedPrimary: {
            borderColor: '#10B981',
            color: '#10B981',
            '&:hover': {
              backgroundColor: 'rgba(16,185,129,0.08)',
              borderColor: '#059669',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1F2937' : '#FFFFFF',
            color: mode === 'dark' ? '#E5E7EB' : '#111827',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1F2937' : '#FFFFFF',
            color: mode === 'dark' ? '#E5E7EB' : '#111827',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#111827' : '#10B981',
            color: mode === 'dark' ? '#E5E7EB' : '#111827',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === 'dark' ? '#1F2937' : '#FFFFFF',
            color: mode === 'dark' ? '#E5E7EB' : '#111827',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#E5E7EB' : '#111827',
          },
        },
      },
    },
  });
}

function App() {
  const [mode, setMode] = useState('dark');
  const theme = useMemo(() => getCustomTheme(mode), [mode]);
  const toggleMode = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode} />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/books"
              element={
                <PrivateRoute>
                  <BookListPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/books/add"
              element={
                <PrivateRoute>
                  <BookFormPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/books/edit/:id"
              element={
                <PrivateRoute>
                  <BookFormPage editMode />
                </PrivateRoute>
              }
            />
            <Route
              path="/google-books"
              element={
                <PrivateRoute>
                  <GoogleBooksPage />
                </PrivateRoute>
              }
            />
            <Route path="/profile/:username" element={<ProfilePage />} />
          </Routes>
        </Router>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
