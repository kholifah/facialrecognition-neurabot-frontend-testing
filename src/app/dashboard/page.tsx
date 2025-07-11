'use client'

import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Card, 
  CardContent,
  Chip,
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
  Eye,
  UserCheck,
  Calendar
} from 'lucide-react'
import CreateEventModal from '@/components/CreateEventModal'

const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}))

const StatsIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}))

const EventCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}))

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

const recentEvents = [
  {
    name: 'Weekly Meeting',
    date: '2025-01-19 at 10:00 AM',
    attendees: 245,
    status: 'recurring',
  },
  {
    name: 'Team Gathering',
    date: '2025-01-18 at 7:00 PM',
    attendees: 68,
    status: 'recurring',
  },
  {
    name: 'Monthly Review',
    date: '2025-01-17 at 7:30 PM',
    attendees: 32,
    status: 'recurring',
  },
]

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
  // Handle event creation logic here
};

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false)
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
          sx={{ px: 2, py: 1 }}
          startIcon={<Plus size={20} />}
          onClick={() => setModalOpen(true)}
        >
          Create Event
        </Button>
      </Box>

      <CreateEventModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreateEvent={handleCreateEvent}
      />

      <Grid container spacing={3} mb={4}>
        {statsData.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatsCard variant='outlined'>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.subtitle}
                      </Typography>
                    </Box>
                    <Box>
                    <StatsIcon sx={{ backgroundColor: stat.bgColor }}>
                      <Icon size={24} color={stat.color} />
                    </StatsIcon>
                    </Box>
                  </Box>
                </CardContent>
              </StatsCard>
            </Grid>
          )
        })}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }} variant="outlined">
            <Box display="flex" alignItems="center">
              <Calendar size={20} style={{ marginRight: 8 }} />
              <Typography variant="h6" fontWeight="bold">
                Recent Events
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Latest organization events and their attendance
            </Typography>
            
            {recentEvents.map((event, index) => (
              <EventCard key={index} elevation={1} variant="outlined">
                <Box>
                  <Box display="flex" alignItems="center" gap={2} mb={1}>
                    <Typography variant="body2" fontWeight="bold">
                      {event.name}
                    </Typography>
                    <Chip 
                      label={event.status} 
                      size="small" 
                      color="default"
                      variant='filled'
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {event.date}
                  </Typography>
                  <Typography variant="body2" color="success.main" fontWeight="medium">
                    {event.attendees} attendees
                  </Typography>
                </Box>
                <Button size="small" variant='outlined' color='inherit' sx={{ fontWeight: 'bold' }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Eye size={20} /> <span>View</span>
                  </Box>
                </Button>
              </EventCard>
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
    </Box>
  )
}
