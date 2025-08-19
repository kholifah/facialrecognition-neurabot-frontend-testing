'use client';

import React from 'react';
import {
  Box,
  Paper,
  Typography,
} from '@mui/material';
import MemberCard from './MemberCard';

interface MemberData {
  id: string;
  name: string;
  memberId: string;
  email: string;
  joinedDate: string;
  lastSeenDate: string;
  status: 'active' | 'inactive';
  photosCount: number;
  photoStatus: 'Good coverage' | 'Need more photos' | 'No photos';
}

interface MemberListSectionProps {
  title: string;
  description: string;
  members: MemberData[];
  onViewPhotos: (memberId: string) => void;
  onViewDetails: (memberId: string) => void;
  onStatusChange: (memberId: string, newStatus: 'active' | 'inactive') => void;
}

export default function MemberListSection({
  title,
  description,
  members,
  onViewPhotos,
  onViewDetails,
  onStatusChange,
}: MemberListSectionProps) {
  return (
    <Paper variant='outlined' sx={{ p: 3, borderRadius: '0.5rem' }}>
      <Typography variant="h5" fontWeight='bold' className=" text-gray-800 mb-2">
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" className="mb-4">
        {description}
      </Typography>
      <Box className="pt-4">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            id={member.id}
            name={member.name}
            memberId={member.memberId}
            email={member.email}
            joinedDate={member.joinedDate}
            lastSeenDate={member.lastSeenDate}
            status={member.status}
            photosCount={member.photosCount}
            photoStatus={member.photoStatus}
            onViewPhotos={onViewPhotos}
            onViewDetails={onViewDetails}
            onStatusChange={onStatusChange}
          />
        ))}
      </Box>
    </Paper>
  );
}
