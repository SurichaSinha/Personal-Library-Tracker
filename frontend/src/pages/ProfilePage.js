import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, Grid, Paper, Stack, Button, ButtonGroup } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import BookCard from '../components/BookCard';
import { useAuth } from '../hooks/useAuth';

const statusOptions = ['All', 'Read', 'Reading', 'To Read'];

function ProfilePage() {
  const { username } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    axios.get(`/users/${username}`)
      .then(res => setProfile(res.data))
      .catch(() => toast.error('Failed to load profile'));
  }, [username]);

  useEffect(() => {
    if (profile && !profile.user.profileImage) {
      const url = `https://api.dicebear.com/7.x/initials/svg?seed=${profile.user.username}`;
      setAvatarUrl(url);
    } else if (profile && profile.user.profileImage) {
      setAvatarUrl(`http://localhost:5000/${profile.user.profileImage}`);
    }
  }, [profile]);

  if (!profile) return null;

  // Quick Stats
  const totalBooks = profile.books.length;
  const booksReadThisMonth = profile.books.filter(
    (book) => book.status === 'Read' && dayjs(book.updatedAt).isSame(dayjs(), 'month')
  ).length;
  const currentlyReading = profile.books.filter((book) => book.status === 'Reading').length;

  const isOwnProfile = user && user.username === username;

  const filteredBooks =
    isOwnProfile || statusFilter === 'All'
      ? profile.books
      : profile.books.filter((book) => book.status === statusFilter);

  // Handlers for own profile
  const handleEdit = (id) => {
    navigate(`/books/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book?')) return;
    try {
      await axios.delete(`/books/${id}`);
      toast.success('Book deleted');
      // Refresh the profile data
      axios.get(`/users/${username}`)
        .then(res => setProfile(res.data))
        .catch(() => toast.error('Failed to reload profile'));
    } catch {
      toast.error('Failed to delete book');
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={avatarUrl}
          sx={{ width: 64, height: 64 }}
        />
        <Box>
          <Typography variant="h5">{profile.user.username}</Typography>
          <Typography variant="subtitle1">{profile.user.email}</Typography>
        </Box>
      </Box>
      {/* Quick Stats Panel */}
      <Paper elevation={2} sx={{ mt: 4, mb: 4, p: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="center" alignItems="center">
          <Box textAlign="center">
            <Typography variant="h6">Total Books</Typography>
            <Typography variant="h4">{totalBooks}</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6">Books Read This Month</Typography>
            <Typography variant="h4">{booksReadThisMonth}</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6">Currently Reading</Typography>
            <Typography variant="h4">{currentlyReading}</Typography>
          </Box>
        </Stack>
      </Paper>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>{isOwnProfile ? 'My Books' : 'Public Book List'}</Typography>
        {!isOwnProfile && (
          <ButtonGroup sx={{ mb: 2 }}>
            {statusOptions.map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'contained' : 'outlined'}
                color={status === 'Read' ? 'success' : status === 'Reading' ? 'primary' : status === 'To Read' ? 'secondary' : 'inherit'}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </Button>
            ))}
          </ButtonGroup>
        )}
        <Grid container spacing={2}>
          {filteredBooks.map((book) => (
            <Grid item xs={12} key={book._id}>
              {isOwnProfile ? (
                <BookCard
                  book={book}
                  onEdit={() => handleEdit(book._id)}
                  onDelete={() => handleDelete(book._id)}
                />
              ) : (
                <BookCard book={book} publicView={true} />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default ProfilePage; 