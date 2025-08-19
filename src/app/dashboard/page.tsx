'use client'

import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Card,
  GridLegacy as Grid
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useState } from 'react';
import { 
  Plus, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Camera,
  UserCheck,
  Calendar
} from 'lucide-react'
import CreateEventModal from '@/components/CreateEventModal'
import StatCard from '@/components/StatCard';

import DashboardEventCard from '@/components/DashboardEventCard'; 
import AttendanceDetailsModal from '@/components/AttendanceDetailsModal'; 

import { AttendanceDetails } from '@/data/types';
import { mockRecentEventSessions, mockAttendanceDetails } from '@/data/mock';

const QuickActionCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}))

const statsData = [
  {
    title: 'Total Members',
    value: '1,247',
    subtitle: '+12 this month',
    icon: Users,
    color: '#3b82f6',
    bgColor: '#eff6ff',
  },
  {
    title: 'This Week Attendance',
    value: '892',
    subtitle: '+5.2% from last week',
    icon: TrendingUp,
    color: '#10b981',
    bgColor: '#ecfdf5',
  },
  {
    title: 'Unmatched Images',
    value: '23',
    subtitle: 'Needs review',
    icon: AlertTriangle,
    color: '#f59e0b',
    bgColor: '#fef3c7',
  },
  {
    title: 'Active Cameras',
    value: '8/8',
    subtitle: 'All operational',
    icon: Camera,
    color: '#8b5cf6',
    bgColor: '#f3e8ff',
  },
]

const recentEvents = mockRecentEventSessions.map(event => ({
  id: event.id,
  name: event.title,
  date: event.dateTime,
  attendees: event.total, 
  status: 'recurring', 
}));

const quickActions = [
  { title: 'Manage Members', icon: UserCheck },
  { title: 'Review Unmatched', icon: AlertTriangle },
  { title: 'View All Events', icon: Calendar },
]

const handleCreateEvent = (eventData: any) => {
  const processedData = {
    ...eventData,
    eventDate: eventData.eventDate?.toDate() || null,
    eventTime: eventData.eventTime?.toDate() || null,
  };
  console.log('Event created:', processedData);
  
};

export default function DashboardPage() {
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false); 
  const [selectedAttendanceData, setSelectedAttendanceData] = useState<AttendanceDetails | null>(null); 

  const handleViewAttendance = (eventId: string) => {
    const data = mockAttendanceDetails[eventId];
    if (data) {
      setSelectedAttendanceData(data);
      setAttendanceModalOpen(true);
    } else {
      console.log(`No attendance data found for event ID: ${eventId}`);
      
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Here's what's happening in your organization.
          </Typography>
        </Box>
        <Button
          size='medium'
          variant="contained"
          sx={{ px: 2, py: 1, boxShadow: 0  }}
          startIcon={<Plus size={20} />}
          onClick={() => setCreateEventModalOpen(true)}
        >
          Create Event
        </Button>
      </Box>

      <Grid container spacing={3} mb={4}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              icon={stat.icon}
              color={stat.color}
              bgColor={stat.bgColor}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: '0.5rem' }} variant="outlined"> 
            <Box display="flex" alignItems="center" mb={2}> 
              <Calendar size={20} style={{ marginRight: 8 }} />
              <Typography variant="h6" fontWeight="bold">
                Recent Events
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Latest organization events and their attendance
            </Typography>
            
            {recentEvents.map((event) => ( 
              <DashboardEventCard
                key={event.id}
                id={event.id}
                name={event.name}
                date={event.date}
                attendees={event.attendees}
                status={event.status}
                onViewAttendance={handleViewAttendance} 
              />
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }} variant="outlined">
            <Typography variant="h6" fontWeight="bold">
              Quick Actions
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Common tasks and shortcuts
            </Typography>
            
            <Box display="flex" flexDirection="column" gap={2}>
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <QuickActionCard key={index} elevation={1} variant="outlined">
                    <Box display="flex" alignItems="center" gap={2}>
                      <Icon size={20} />
                      <Typography variant="body1" fontWeight="medium">
                        {action.title}
                      </Typography>
                    </Box>
                  </QuickActionCard>
                )
              })}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {/* Create Event Modal */}
      <CreateEventModal 
        open={createEventModalOpen} 
        onClose={() => setCreateEventModalOpen(false)} 
        onCreateEvent={handleCreateEvent}
      />
      {/* Attendance Details Modal */}
      <AttendanceDetailsModal
        open={attendanceModalOpen}
        onClose={() => setAttendanceModalOpen(false)}
        attendanceData={selectedAttendanceData}
      />
    </Box>
  )
}
