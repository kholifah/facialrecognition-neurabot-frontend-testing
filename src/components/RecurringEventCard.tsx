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
import { History } from 'lucide-react'; 

interface RecurringEventCardProps {
  id: string;
  title: string;
  schedule: string; 
  avgAttendance: number;
  lastSessionAttendance: number;
  status: 'active' | 'inactive'; 
  onViewHistory: (eventId: string) => void;
}

export default function RecurringEventCard({
  id,
  title,
  schedule,
  avgAttendance,
  lastSessionAttendance,
  status,
  onViewHistory,
}: RecurringEventCardProps) {
  const statusColor = status === 'active' ? 'success' : 'default';

  return (
    <Card variant='outlined' sx={{ borderRadius: '0.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, p: 3, '&:last-child': { pb: 3 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="h6" fontWeight='bold' component="h3" className=" text-gray-800">
            {title}
          </Typography>
          <Chip
            label={status}
            color={statusColor}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {schedule}
        </Typography>

        <Box display="flex" flexDirection="column" gap={1} mb={3}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Avg Attendance:</Typography>
            <Typography variant="body2" className="font-semibold text-gray-800">
              {avgAttendance}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">Last Session:</Typography>
            <Typography variant="body2" className="font-semibold text-gray-800">
              {lastSessionAttendance}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="outlined"
          size="small"
          color='inherit'
          fullWidth
          startIcon={<History size={18} />}
          sx={{ textTransform: 'capitalize', borderRadius: '0.5rem' }}
          onClick={() => onViewHistory(id)}
        >
          View History
        </Button>
      </CardContent>
    </Card>
  );
}
