import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, TextField, MenuItem, Button, Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import BookCard from '../components/BookCard';

const statusOptions = ['To Read', 'Reading', 'Read'];

function BookListPage() {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ status: '', title: '', author: '' });
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.title) params.title = filters.title;
      if (filters.author) params.author = filters.author;
      const res = await axios.get('/books', { params });
      setBooks(res.data);
    } catch (err) {
      toast.error('Failed to fetch books');
    }
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = () => {
    fetchBooks();
  };

  const handleEdit = (id) => {
    navigate(`/books/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book?')) return;
    try {
      await axios.delete(`/books/${id}`);
      toast.success('Book deleted');
      fetchBooks();
    } catch {
      toast.error('Failed to delete book');
    }
  };

  const handleView = (id) => {
    // You can implement a details page or modal if desired
    toast.info('View details not implemented yet.');
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Books
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            select
            label="Status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">All</MenuItem>
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Title"
            name="title"
            value={filters.title}
            onChange={handleFilterChange}
          />
          <TextField
            label="Author"
            name="author"
            value={filters.author}
            onChange={handleFilterChange}
          />
          <Button variant="contained" onClick={handleFilter}>
            Filter
          </Button>
        </Box>
        <Grid container spacing={2}>
          {books.map((book) => (
            <Grid item xs={12} key={book._id}>
              <BookCard
                book={book}
                onEdit={() => handleEdit(book._id)}
                onDelete={() => handleDelete(book._id)}
                onView={() => handleView(book._id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default BookListPage; 