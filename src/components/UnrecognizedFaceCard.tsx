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
} from '@mui/material';
import { MapPin } from 'lucide-react';

import { UnrecognizedFace } from '@/data/types';

interface UnrecognizedFaceCardProps {
  face: UnrecognizedFace;
  onManualMatch: (faceId: string) => void;
}

export default function UnrecognizedFaceCard({ face, onManualMatch }: UnrecognizedFaceCardProps) {
  const probabilityColor = (prob: number) => {
    if (prob >= 70) return 'success';
    if (prob >= 40) return 'warning';
    return 'error';
  };

  return (
    <Card variant='outlined' sx={{ borderRadius: '0.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="180" 
        image={face.imageUrl}
        alt="Unrecognized Face"
        onError={(e) => { e.currentTarget.src = 'https://placehold.co/200x180/E0E0E0/A0A0A0?text=Unrecognized+face'; }} 
        sx={{ bgcolor: 'grey.200', display: 'flex', alignItems: 'center', justifyContent: 'center', objectFit: 'contain' }}
      />
      <CardContent sx={{ flexGrow: 1, p: 2, '&:last-child': { pb: 2 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="body2" fontWeight='bold' className=" text-gray-800">
            Unrecognized face
          </Typography>
          <Chip
            label={`${face.probability}%`}
            color={probabilityColor(face.probability)}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Detected at {face.detectedTime}
        </Typography>
        <Box display="flex" alignItems="center" gap={0.5} mb={2}>
          <MapPin size={14} className="text-gray-500" />
          <Typography variant="caption" color="text.secondary">
            {face.location}
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="small"
          color='inherit'
          fullWidth
          sx={{ textTransform: 'capitalize', borderRadius: '0.5rem' }}
          onClick={() => onManualMatch(face.id)}
        >
          Manual Match
        </Button>
      </CardContent>
    </Card>
  );
}
