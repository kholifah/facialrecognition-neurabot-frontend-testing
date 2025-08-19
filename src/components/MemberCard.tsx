'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Select,
  MenuItem,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Eye, Camera, User, ChevronDown } from 'lucide-react'; 


const UserPhotoBox = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


interface MemberCardProps {
  id: string;
  name: string;
  memberId: string;
  email: string;
  joinedDate: string;
  lastSeenDate: string;
  status: 'active' | 'inactive';
  photosCount: number;
  photoStatus: 'Good coverage' | 'Need more photos' | 'No photos';
  memberAvatarUrl?: string;
  onViewPhotos: (memberId: string) => void;
  onViewDetails: (memberId: string) => void;
  onStatusChange: (memberId: string, newStatus: 'active' | 'inactive') => void;
}

export default function MemberCard({
  id,
  name,
  memberId,
  email,
  joinedDate,
  lastSeenDate,
  status,
  photosCount,
  memberAvatarUrl,
  onViewPhotos,
  onViewDetails,
  onStatusChange,
}: MemberCardProps) {
  const chipColor = status === 'active' ? 'success' : 'default';
  const chipLabel = status === 'active' ? 'active' : 'inactive';

  const photoChipLabel = `${photosCount} photos`;

  return (
    <Card variant='outlined' className="mb-4" sx={{ borderRadius: '0.5rem' }}>
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Member Info */}
          <Box display="flex" alignItems="center" gap={2}>
                <Box>
                    <Avatar sx={{ width: 48, height: 48, bgcolor: 'grey.300' }}>
                        {memberAvatarUrl ? (
                            <img src={memberAvatarUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            name.charAt(0)
                        )}
                    </Avatar>
                </Box>
                <Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body1" fontWeight='bold' className=" text-gray-800 mb-1">
                            {name}{' '}
                        </Typography>
                        <Chip
                            label={chipLabel}
                            color={chipColor}
                            size="small"
                            sx={{ ml: 1, textTransform: 'capitalize' }}
                        />
                    </Box>
                    <Typography variant="body2" color="text.secondary" className="mb-1">
                        ID: {memberId} | {email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Joined: {joinedDate} | Last seen: {lastSeenDate}
                    </Typography>
                </Box>
            </Box>

          {/* Actions */}
          <Box display="flex" alignItems="center" gap={2}>
            <Box>
                <Typography variant="body2" fontWeight='bold' className="text-green-600 mb-1">
                    {photoChipLabel}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Good coverage
                </Typography>
            </Box>

            <Select
              value={status}
              onChange={(e) => onStatusChange(id, e.target.value as 'active' | 'inactive')}
              size="small"
              variant="outlined"
              sx={{ textTransform: 'capitalize', minWidth: 120, borderRadius: '0.5rem' }}
              IconComponent={ChevronDown}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>

            <Button
              size="medium"
              variant='outlined'
              color='inherit'
              sx={{ textTransform: 'capitalize', borderColor: 'rgb(209 213 219)', borderRadius: '0.5rem' }}
              onClick={() => onViewDetails(id)}
            >
              <Box display="flex" alignItems="center" gap={0.5}>
                <Eye size={18} /> <span>View</span>
              </Box>
            </Button>

            <Button
              size="medium"
              variant='outlined'
              color='inherit'
              sx={{ textTransform: 'capitalize', borderColor: 'rgb(209 213 219)', borderRadius: '0.5rem' }}
              onClick={() => onViewPhotos(id)}
            >
              <Box display="flex" alignItems="center" gap={0.5}>
                <Camera size={18} /> <span>Photos</span>
              </Box>
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
