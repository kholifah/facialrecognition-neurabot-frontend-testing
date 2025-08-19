'use client';

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  LayoutDashboard,
  Calendar,
  Users,
  ImageOff,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link'; 

interface SettingItem {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType; 
  href: string; 
}

const settingItems: SettingItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard Settings',
    description: 'Configure dashboard widgets and preferences.',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    id: 'events',
    name: 'Event Management Settings',
    description: 'Manage event types, attendance rules, and schedules.',
    icon: Calendar,
    href: '/events',
  },
  {
    id: 'members',
    name: 'Member Profile Settings',
    description: 'Adjust member profile fields and photo requirements.',
    icon: Users,
    href: '/members',
  },
  {
    id: 'unmatched-images',
    name: 'Unmatched Images Review',
    description: 'Review and configure settings for unmatched face images.',
    icon: ImageOff,
    href: '/unmatched-images',
  },
];

export default function SettingsPage() {
  return (
    <Box>
      
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        
        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'grey.50', overflowY: 'auto' }}>
          <Box display="flex" alignItems="center" mb={3}>
            <SettingsIcon size={24} style={{ marginRight: 8 }} />
            <Typography variant="h4" fontWeight="bold" component="h1">
              Settings
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Manage various settings and configurations for your organization's system.
          </Typography>

          <Paper variant='outlined' sx={{ p: 3, borderRadius: '0.5rem' }}>
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Application Sections
            </Typography>
            <List>
              {settingItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <ListItemButton component={Link} href={item.href} sx={{ borderRadius: '0.5rem', mb: 1 }}>
                    <ListItemIcon>
                      <item.icon size={24} color="#666" />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography variant="body1" fontWeight="medium">{item.name}</Typography>}
                      secondary={<Typography variant="body2" color="text.secondary">{item.description}</Typography>}
                    />
                    <ChevronRight size={20} color="#999" />
                  </ListItemButton>
                  {index < settingItems.length - 1 && <Divider component="li" sx={{ my: 1 }} />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
