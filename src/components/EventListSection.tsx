
'use client';

import React from 'react';
import EventCard from './EventCard';
import {
  Box,
  Paper,
  Typography, 
} from '@mui/material';

interface EventData {
  id: string;
  title: string;
  dateTime: string;
  recognized: number;
  unmatched: number;
  total: number;
}

interface EventListSectionProps {
  title: string;
  description: string;
  events: EventData[];
  onViewAttendance: (eventId: string) => void;
}

export default function EventListSection({ title, description, events, onViewAttendance }: EventListSectionProps) {
  return (
    
    <Paper variant='outlined' sx={{ p: 3, borderRadius: '0.5rem' }}> 
      
      <Typography variant="h5" fontWeight="bold" component="h2" className=" text-gray-800 mb-4">
        {title}
      </Typography>
      
      <Typography variant="body1" color="text.secondary" className="mb-4">
        {description}
      </Typography>
      <Box className="pt-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            dateTime={event.dateTime}
            recognized={event.recognized}
            unmatched={event.unmatched}
            total={event.total}
            eventId={event.id}
            onViewAttendance={onViewAttendance}
          />
        ))}
      </Box>
    </Paper>
  );
}
