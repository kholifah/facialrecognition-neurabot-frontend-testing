'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import { Eye } from 'lucide-react'; 

interface SpecialEventCardProps {
  id: string;
  title: string;
  dateTime: string; 
  attendance: number | 'TBD'; 
  status: 'completed' | 'upcoming' | 'TBD';
  onViewDetails: (eventId: string) => void;
}

export default function SpecialEventCard({
  id,
  title,
  dateTime,
  attendance,
  status,
  onViewDetails,
}: SpecialEventCardProps) {
  const statusColor = (eventStatus: string) => {
    switch (eventStatus) {
      case 'completed': return 'success';
      case 'upcoming': return 'primary'; 
      case 'TBD': return 'default';
      default: return 'default';
    }
  };

  return (
    <Card variant='outlined' sx={{ borderRadius: '0.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, p: 3, '&:last-child': { pb: 3 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="h6" fontWeight='bold' component="h3" className=" text-gray-800">
            {title}
          </Typography>
          <Chip
            label={status}
            color={statusColor(status)}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {dateTime}
        </Typography>

        <Box display="flex" flexDirection="column" gap={1} mb={3}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Attendance:</Typography>
            <Typography variant="body2" className="font-semibold text-gray-800">
              {attendance}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="outlined"
          size="small"
          color='inherit'
          fullWidth
          startIcon={status === 'upcoming' ? undefined : <Eye size={18} />} 
          sx={{ textTransform: 'capitalize', borderRadius: '0.5rem' }}
          onClick={() => onViewDetails(id)}
          disabled={status === 'upcoming'} 
        >
          {status === 'upcoming' ? 'Upcoming' : 'View Details'}
        </Button>
      </CardContent>
    </Card>
  );
}
