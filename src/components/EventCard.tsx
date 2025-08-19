
import React from 'react';
import {
  Box,
  Button,
  Card, 
  CardContent,
  Typography, 
} from '@mui/material';
import { Eye } from 'lucide-react';

interface EventCardProps {
  title: string;
  dateTime: string;
  recognized: number;
  unmatched: number;
  total: number;
  eventId: string;
  onViewAttendance: (eventId: string) => void; 
}

export default function EventCard({
  title,
  dateTime,
  recognized,
  unmatched,
  total,
  eventId,
  onViewAttendance,
}: EventCardProps) {
  return (
    <Card variant="outlined" className="mb-4 border border-gray-200" sx={{ borderRadius: '0.5rem' }}>
      <Box className="flex justify-between items-center p-3">
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <Typography variant="body1" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-3">
            {dateTime}
          </Typography>
          <Box className="flex space-x-4 text-sm pt-2">
            <Box className='flex gap-2'>
              <Typography component="span" fontWeight="medium" className="text-green-600">{recognized}</Typography>
              <Typography component="span" fontWeight="medium">recognized</Typography>
            </Box>
            <Box className='flex gap-2'>
              <Typography component="span" fontWeight="medium" className="text-red-600">{unmatched}</Typography>
              <Typography component="span" fontWeight="medium">unmatched</Typography>
            </Box>
            <Box className='flex gap-2'>
              <Typography component="span" fontWeight="medium" className="text-gray-600">{total}</Typography>
              <Typography component="span" fontWeight="medium">total</Typography>
            </Box>
          </Box>
        </CardContent>

        <Button
          size="medium"
          variant='outlined'
          color='inherit'
          sx={{ textTransform: 'capitalize', borderColor: 'rgb(209 213 219)' }} 
          onClick={() => onViewAttendance(eventId)}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Eye size={20} />
            <span>View Attendance</span>
          </Box>
        </Button>
      </Box>
    </Card>
  );
}
