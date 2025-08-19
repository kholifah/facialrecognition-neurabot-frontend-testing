'use client';

import React from 'react';
import {
  Box,
  Paper, 
  Typography,
  Chip
} from '@mui/material';
import { X } from 'lucide-react';

interface RejectedImageCardProps {
  id: string;
  eventName: string;
  eventDate: string;
  reason: string; 
  rejectedByAdmin: string;
  rejectedDateTime: string; 
}

export default function RejectedImageCard({
  id,
  eventName,
  eventDate,
  reason,
  rejectedByAdmin,
  rejectedDateTime,
}: RejectedImageCardProps) {
  return (
    <Paper variant='outlined' sx={{ p: 2, mb: 2, borderRadius: '0.5rem' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box>
                <Box sx={{borderColor: 'divider'}} className='p-8 rounded-md bg-gray-100'></Box>
            </Box>
            <Box>
                <Typography variant="body1" fontWeight='bold' className=" text-gray-800">
                    {eventName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {eventDate}
                </Typography>
                <Typography variant="body2" color="error" className="font-semibold" sx={{ mt: 0.5 }}>
                    Reason: {reason}
                </Typography>
            </Box>
        </Box>
        <Box textAlign="right">
          <Typography fontWeight='bold' variant="caption" color="text.secondary" display="block">
            Rejected by {rejectedByAdmin}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            {rejectedDateTime}
          </Typography>
          
          <Chip
            label= 'Rejected'
            color='error'
            size="small"
            icon={<X size={14} />}
            variant="outlined"
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
      </Box>
    </Paper>
  );
}
