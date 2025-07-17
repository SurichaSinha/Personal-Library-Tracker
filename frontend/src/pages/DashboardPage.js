import React from 'react';
import { Container, Typography, Button, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// You can replace this with a local asset or a royalty-free dark library image
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1500&q=80';

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '70vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        mb: 6,
      }}
    >
      {/* Background image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1,
        }}
      />
      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(rgba(0,0,0,0.7), rgba(17,24,39,0.8))',
          zIndex: 2,
        }}
      />
      {/* Centered content */}
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: { xs: '60vh', md: '70vh' },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%' }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              color: '#E5E7EB',
              fontWeight: 700,
              mb: 2,
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: { xs: '2.2rem', md: '3.2rem' },
            }}
          >
            Welcome to Your Personal Library
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              color: '#E5E7EB',
              mb: 4,
              fontWeight: 400,
              fontFamily: 'Open Sans, sans-serif',
              fontSize: { xs: '1.1rem', md: '1.5rem' },
            }}
          >
            Track, organize, and grow your reading journey.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ width: '100%' }}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 4, fontWeight: 700, fontSize: '1.1rem', borderRadius: 2 }}
              onClick={() => navigate('/books')}
            >
              View Books
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              sx={{
                px: 4,
                fontWeight: 700,
                fontSize: '1.1rem',
                borderRadius: 2,
                borderWidth: 2,
                borderColor: '#22D3EE',
                color: '#22D3EE',
                '&:hover': {
                  background: 'rgba(34,211,238,0.08)',
                  borderColor: '#22D3EE',
                },
              }}
              onClick={() => navigate('/books/add')}
            >
              Add Book
            </Button>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}

export default DashboardPage; 