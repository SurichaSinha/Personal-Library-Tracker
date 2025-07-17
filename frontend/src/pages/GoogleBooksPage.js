import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, Box, Grid, Card, CardContent, CardMedia, CardActions
} from '@mui/material';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function GoogleBooksPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.get('/google-books', { params: { query } });
      setResults(res.data.items || []);
    } catch {
      toast.error('Failed to fetch from Google Books');
    }
    setLoading(false);
  };

  const handleImport = async (book) => {
    const info = book.volumeInfo;
    const newBook = {
      title: info.title || '',
      author: (info.authors && info.authors.join(', ')) || '',
      genre: (info.categories && info.categories[0]) || '',
      status: 'To Read',
      googleImage: info.imageLinks?.thumbnail || '',
    };
    try {
      await axios.post('/books', newBook);
      toast.success('Book imported!');
      navigate('/books');
    } catch {
      toast.error('Failed to import book');
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Google Books Search
        </Typography>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <TextField
            label="Search by title or author"
            value={query}
            onChange={e => setQuery(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" disabled={loading}>
            Search
          </Button>
        </form>
        <Grid container spacing={2}>
          {results.map((book) => {
            const info = book.volumeInfo;
            return (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <Card>
                  {info.imageLinks?.thumbnail && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={info.imageLinks.thumbnail}
                      alt={info.title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6">{info.title}</Typography>
                    <Typography variant="subtitle2">{info.authors?.join(', ')}</Typography>
                    <Typography variant="body2">{info.categories?.[0]}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleImport(book)}>
                      Import
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
}

export default GoogleBooksPage;
