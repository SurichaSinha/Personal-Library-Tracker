import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack,
  IconButton,
  useMediaQuery,
  Skeleton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';

const statusColors = {
  'Read': 'success',
  'Reading': 'primary',
  'To Read': 'default',
};

function BookCard({
  book,
  onEdit,
  onDelete,
  loading = false,
  publicView = false,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Lazy load image with fallback
  const [imgLoaded, setImgLoaded] = React.useState(false);

  // Prefer googleImage if present, else local coverImage
  const coverSrc = book.googleImage
    ? book.googleImage
    : book.coverImage
    ? `http://localhost:5000/${book.coverImage}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%' }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: 3,
          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)',
          mb: 2,
          p: 1,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'scale(1.025)',
            boxShadow: `0 8px 32px 0 ${theme.palette.primary.main}22`,
          },
        }}
      >
        {/* Book Cover */}
        <Box
          sx={{
            minWidth: isMobile ? '100%' : 120,
            maxWidth: isMobile ? '100%' : 120,
            minHeight: 180,
            maxHeight: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2,
            overflow: 'hidden',
            background: theme.palette.background.default,
            mr: isMobile ? 0 : 2,
            mb: isMobile ? 2 : 0,
          }}
        >
          {loading ? (
            <Skeleton variant="rectangular" width={120} height={180} />
          ) : coverSrc ? (
            <img
              src={coverSrc}
              alt={book.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: imgLoaded ? 'block' : 'none' }}
              onLoad={() => setImgLoaded(true)}
            />
          ) : (
            <Box sx={{ width: '100%', height: '100%', bgcolor: theme.palette.action.hover, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="caption" color={theme.palette.text.secondary}>No Image</Typography>
            </Box>
          )}
          {/* Show skeleton while loading image */}
          {!imgLoaded && coverSrc && <Skeleton variant="rectangular" width={120} height={180} sx={{ position: 'absolute' }} />}
        </Box>
        {/* Book Info & Actions */}
        <CardContent sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              {book.title}
            </Typography>
            <Chip
              label={book.status}
              color={statusColors[book.status] || 'default'}
              size="small"
              sx={{ ml: 1, fontWeight: 600 }}
            />
          </Stack>
          <Typography variant="subtitle2" sx={{ mb: 1, fontFamily: 'Open Sans, sans-serif', color: theme.palette.text.secondary }}>
            {book.author}
          </Typography>
          {/* Only show actions if not publicView */}
          {!publicView && (
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton
                size="small"
                color="secondary"
                onClick={onEdit}
                sx={{
                  color: theme.palette.secondary.main,
                  transition: 'transform 0.15s',
                  '&:hover': { color: theme.palette.secondary.dark, transform: 'scale(1.15)' },
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={onDelete}
                sx={{
                  color: theme.palette.error.main,
                  transition: 'transform 0.15s',
                  '&:hover': { color: theme.palette.error.dark, transform: 'scale(1.15)' },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default BookCard; 