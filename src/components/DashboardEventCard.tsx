'use client';

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import { Eye, Calendar } from 'lucide-react';

interface DashboardEventCardProps {
  id: string; 
  name: string;
  date: string;
  attendees: number;
  status: string; 
  onViewAttendance: (eventId: string) => void;
}

export default function DashboardEventCard({
  id,
  name,
  date,
  attendees,
  status,
  onViewAttendance,
}: DashboardEventCardProps) {
  return (
    <Paper variant='outlined' sx={{ p: 2, mb: 2, borderRadius: '0.5rem' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Typography variant="body2" fontWeight="bold">
              {name}
            </Typography>
            <Chip
              label={status}
              size="small"
              color="default"
              variant='filled'
              sx={{ textTransform: 'capitalize' }}
            />
          </Box>
          <Box display="flex" alignItems="center" gap={0.5} mb={1}>
            <Calendar size={14} className="text-gray-500" />
            <Typography variant="body2" color="text.secondary">
              {date}
            </Typography>
          </Box>
          <Typography variant="body2" color="success.main" fontWeight="medium">
            {attendees} attendees
          </Typography>
        </Box>
        <Button
          size="medium"
          variant='outlined'
          color='inherit'
          sx={{ fontWeight: 'bold', textTransform: 'capitalize', borderColor: 'rgb(209 213 219)', borderRadius: '0.5rem' }}
          onClick={() => onViewAttendance(id)} 
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Eye size={20} /> <span>View</span>
          </Box>
        </Button>
      </Box>
    </Paper>
  );
}
