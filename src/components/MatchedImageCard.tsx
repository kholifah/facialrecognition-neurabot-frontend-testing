'use client';

import React from 'react';
import {
  Box,
  Paper, 
  Typography,
  Avatar,
  Chip
} from '@mui/material';
import { Check } from 'lucide-react'; 

interface MatchedImageCardProps {
  id: string;
  memberAvatarUrl?: string;
  memberName: string;
  memberId: string;
  eventName: string;
  eventDate: string;
  matchedByAdmin: string; 
  matchedDateTime: string; 
}

export default function MatchedImageCard({
  id,
  memberAvatarUrl,
  memberName,
  memberId,
  eventName,
  eventDate,
  matchedByAdmin,
  matchedDateTime,
}: MatchedImageCardProps) {
  return (
    <Paper variant='outlined' sx={{ p: 2, borderRadius: '0.5rem' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ width: 48, height: 48, bgcolor: 'grey.300' }}>
            {memberAvatarUrl ? (
              <img src={memberAvatarUrl} alt={memberName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              memberName.charAt(0)
            )}
          </Avatar>
          <Box>
            <Typography variant="body1" fontWeight='bold' className=" text-gray-800">
              {memberName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {memberId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {eventName} - {eventDate}
            </Typography>
          </Box>
        </Box>
        <Box textAlign="right">
          <Typography variant="caption" color="text.secondary" display="block">
            Matched by {matchedByAdmin}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            {matchedDateTime}
          </Typography>
          <Chip
            label= 'Matched'
            color='success'
            size="small"
            icon={<Check size={14} />}
            variant="outlined"
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
      </Box>
    </Paper>
  );
}
