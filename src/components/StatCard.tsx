'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Box for the stat icon background
const StatIconBox = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Styled Card for the stat card itself
const StyledStatCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '0.5rem', 
}));

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: any; 
  color: string; 
  bgColor: string; 
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon, 
  color,
  bgColor,
}: StatCardProps) {
  return (
    <StyledStatCard variant='outlined'>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="body2" fontWeight="bold" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
          <StatIconBox sx={{ backgroundColor: bgColor }}>
            <Icon size={24} color={color} /> 
          </StatIconBox>
        </Box>
      </CardContent>
    </StyledStatCard>
  );
}