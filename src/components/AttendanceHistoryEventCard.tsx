'use client';

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
} from '@mui/material';
import { Calendar } from 'lucide-react'; 

interface AttendanceHistoryEventCardProps {
  id: string;
  eventName: string;
  dateTime: string;
  status: 'Present' | 'Absent' | 'Late'; 
}

export default function AttendanceHistoryEventCard({
  id,
  eventName,
  dateTime,
  status,
}: AttendanceHistoryEventCardProps) {
  const statusColor = (attendanceStatus: string) => {
    switch (attendanceStatus) {
      case 'Present': return 'success';
      case 'Absent': return 'error';
      case 'Late': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Paper variant='outlined' sx={{ p: 1, borderRadius: '0.5rem' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body1" fontWeight='bold' className=" text-gray-800">
            {eventName}
          </Typography>
          <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
            <Calendar size={14} className="text-gray-500" />
            <Typography variant="body2" color="text.secondary">
              {dateTime}
            </Typography>
          </Box>
        </Box>
        <Chip
          label={status}
          color={statusColor(status)}
          size="small"
          sx={{ textTransform: 'capitalize' }}
        />
      </Box>
    </Paper>
  );
}
