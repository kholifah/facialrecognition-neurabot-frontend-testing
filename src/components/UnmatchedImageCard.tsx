'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  CardMedia,
  CardActions
} from '@mui/material';
import { User, X } from 'lucide-react';

interface UnmatchedImageCardProps {
  id: string;
  imageUrl: string;
  eventName: string;
  dateTime: string;
  location: String;
  matchProbability: number; 
  onMatch: (imageId: string) => void;
  onReject: (imageId: string) => void;
}

export default function UnmatchedImageCard({
  id,
  imageUrl,
  eventName,
  dateTime,
  location,
  matchProbability,
  onMatch,
  onReject,
}: UnmatchedImageCardProps) {
  const probabilityColor = (prob: number) => {
    if (prob >= 70) return 'success';
    if (prob >= 40) return 'warning';
    return 'error';
  };

  return (
    <Card variant='outlined' sx={{ borderRadius: '0.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p:2, borderRadius: '0.5rem',}}>
        <CardMedia
            component="img"
            height="180" 
            image={imageUrl}
            alt="Unmatched Face"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/200x180/E0E0E0/A0A0A0?text=No+Image'; }} 
            sx={{overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', objectFit: 'contain' }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="body1" fontWeight='bold' className=" text-gray-800">
            {eventName}
          </Typography>
          <Chip
            label={`${matchProbability}%`}
            color={probabilityColor(matchProbability)}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
          {dateTime}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
          {location}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 0, p: 2 }}>
        <Button
            variant="contained"
            size="small"
            color='inherit'
            startIcon={<User size={16} />}
            sx={{ width: '60%', textTransform: 'capitalize', flexGrow: 1, borderRadius: '0.5rem' }}
            onClick={() => onMatch(id)}
        >
            Match
        </Button>
        <Button
            variant="outlined"
            size="small"
            startIcon={<X size={16} />}
            color="inherit"
            sx={{ width: '40%', textTransform: 'capitalize', flexGrow: 1, borderRadius: '0.5rem' }}
            onClick={() => onReject(id)}
        >
            Reject
        </Button>
      </CardActions>
    </Card>
  );
}
