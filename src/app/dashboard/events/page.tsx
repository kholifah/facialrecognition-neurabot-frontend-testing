
'use client'

import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  Tabs,
  Tab,
  GridLegacy as Grid
} from '@mui/material'
import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
} from 'lucide-react'
import CreateEventModal from '@/components/CreateEventModal'
import EventListSection from '@/components/EventListSection'
import AttendanceDetailsModal from '@/components/AttendanceDetailsModal';
import RecurringEventCard from '@/components/RecurringEventCard'; 
import SpecialEventCard from '@/components/SpecialEventCard'; 

import { mockRecentEventSessions, mockAttendanceDetails, mockRecurringEvents, mockSpecialEvents } from '@/data/mock';

export default function EventsPage() {
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [attendanceModalData, setAttendanceModalData] = useState<any | null>(null); 
  const [ViewAttendanceModalOpen, setViewAttendanceModalOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleViewRecurringHistory = (eventId: string) => {
    console.log(`View history for recurring event: ${eventId}`);
    
    const data = mockAttendanceDetails[eventId];
    if (data) {
      setAttendanceModalData(data);
      
    } else {
      console.log(`No history data found for recurring event ID: ${eventId}`);
    }
  };

  const handleViewSpecialEventDetails = (eventId: string) => {
    console.log(`View details for special event: ${eventId}`);
    
    const data = mockAttendanceDetails[eventId]; 
    if (data) {
      setAttendanceModalData(data);
      
    } else {
      console.log(`No details data found for special event ID: ${eventId}`);
    }
  };

  const handleCreateEvent = (eventData: any) => {
    const processedData = {
      ...eventData,
      eventDate: eventData.eventDate?.toDate() || null,
      eventTime: eventData.eventTime?.toDate() || null,
    };
    console.log('Event created:', processedData);
    
  };

  const handleViewAttendance = (eventId: string) => {
    // Fetch attendance data from centralized mock data
    const data = mockAttendanceDetails[eventId];
    if (data) {
      setAttendanceModalData(data);
      setViewAttendanceModalOpen(true);
    }
  };

  return (
    <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Events
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage organization events and view attendance records.
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

        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'grey.50', overflowY: 'auto' }}> 
          {/* Search and Filter Section */}
          <Paper elevation={0} sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, borderRadius: '0.5rem' }}>
            <TextField
              fullWidth
              placeholder="Search events..."
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: 'background.paper', borderRadius: '0.5rem' }} 
            />

            <Select
              value=""
              displayEmpty
              size='small'
              startAdornment={
                <InputAdornment position="start">
                  <Filter size={20} />
                </InputAdornment>
              }
              
              IconComponent={() => null}
              renderValue={() => "Filter"}
              sx={{
                bgcolor: 'background.paper',
                borderRadius: '0.5rem',
                width: { xs: '100%', md: 'auto' }, 
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.23)', 
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.87)', 
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main', 
                  borderWidth: '2px', 
                },
              }}
            >
              <MenuItem value="">All Events</MenuItem>
              <MenuItem value="upcoming">Upcoming</MenuItem>
              <MenuItem value="past">Past</MenuItem>
            </Select>
          </Paper>

          {/* Tabs Section */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={selectedTab} onChange={handleChange} aria-label="event tabs">
              <Tab sx={{ fontWeight: 'bold' }}  label="Recent Sessions" />
              <Tab sx={{ fontWeight: 'bold' }}  label="Recurring Events" />
              <Tab sx={{ fontWeight: 'bold' }}  label="Special Events" />
            </Tabs>
          </Box>

          {/* Conditional rendering based on selected tab */}
          {selectedTab === 0 && (
            <EventListSection
              title="Recent Event Sessions"
              description="Latest event sessions with attendance data"
              events={mockRecentEventSessions}
              onViewAttendance={handleViewAttendance} 
            />
          )}
          {selectedTab === 1 && (
            <Paper className="shadow-sm" sx={{ p: 3, borderRadius: '0.5rem' }}>
              <Typography variant="h5" fontWeight='bold' component="h2" className=" text-gray-800 mb-2">
                Recurring Events
              </Typography>
              <Typography variant="body1" color="text.secondary" className="mb-4">
                Manage your regularly scheduled events.
              </Typography>
              <Grid container spacing={3} className="pt-4">
                {mockRecurringEvents.length > 0 ? (
                  mockRecurringEvents.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                      <RecurringEventCard
                        id={event.id}
                        title={event.title}
                        schedule={event.schedule}
                        avgAttendance={event.avgAttendance}
                        lastSessionAttendance={event.lastSessionAttendance}
                        status={event.status}
                        onViewHistory={handleViewRecurringHistory}
                      />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                      <Typography variant="body2">
                        No recurring events to display yet.
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Paper>
          )}
          {selectedTab === 2 && (
            <Paper className="shadow-sm" sx={{ p: 3, borderRadius: '0.5rem' }}>
              <Typography variant="h5" fontWeight='bold' component="h2" className=" text-gray-800 mb-2">
                Special Events
              </Typography>
              <Typography variant="body1" color="text.secondary" className="mb-4">
                View one-time events and their details.
              </Typography>
              <Grid container spacing={3} className="pt-4">
                {mockSpecialEvents.length > 0 ? (
                  mockSpecialEvents.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                      <SpecialEventCard
                        id={event.id}
                        title={event.title}
                        dateTime={event.dateTime}
                        attendance={event.attendance}
                        status={event.status}
                        onViewDetails={handleViewSpecialEventDetails}
                      />
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                      <Typography variant="body2">
                        No special events to display yet.
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Paper>
          )}
        </Box>

      {/* Create Event Modal */}
      <CreateEventModal
        open={createEventModalOpen}
        onClose={() => setCreateEventModalOpen(false)}
        onCreateEvent={handleCreateEvent}
      />
      {/* Attendance Details Modal */}
      <AttendanceDetailsModal
        open={ViewAttendanceModalOpen}
        onClose={() => setViewAttendanceModalOpen(false)}
        attendanceData={attendanceModalData}
      />
    </Box>
  );
}
