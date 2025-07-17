import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button, Box, MenuItem, Card, CardMedia
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';

const statusOptions = ['To Read', 'Reading', 'Read'];

function BookFormPage({ editMode }) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    status: 'To Read',
    coverImage: null,
  });
  const [preview, setPreview] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (editMode && id) {
      axios.get('/books', { params: { } }).then(res => {
        const book = res.data.find(b => b._id === id);
        if (book) {
          setForm({
            title: book.title,
            author: book.author,
            genre: book.genre,
            status: book.status,
            coverImage: null,
          });
          setPreview(book.coverImage ? `http://localhost:5000/${book.coverImage}` : null);
        }
      });
    }
    // eslint-disable-next-line
  }, [editMode, id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'coverImage') {
      setForm({ ...form, coverImage: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', form.title);
    data.append('author', form.author);
    data.append('genre', form.genre);
    data.append('status', form.status);
    if (form.coverImage) data.append('coverImage', form.coverImage);

    try {
      if (editMode) {
        await axios.put(`/books/${id}`, data);
        toast.success('Book updated!');
      } else {
        await axios.post('/books', data);
        toast.success('Book added!');
      }
      navigate('/books');
    } catch (err) {
      toast.error('Failed to save book');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          {editMode ? 'Edit Book' : 'Add New Book'}
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Author"
            name="author"
            value={form.author}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Genre"
            name="genre"
            value={form.genre}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Cover Image
            <input type="file" name="coverImage" hidden accept="image/*" onChange={handleChange} />
          </Button>
          {preview && (
            <Card sx={{ mt: 2, maxWidth: 200 }}>
              <CardMedia component="img" image={preview} alt="Cover Preview" />
            </Card>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            {editMode ? 'Update Book' : 'Add Book'}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default BookFormPage; 