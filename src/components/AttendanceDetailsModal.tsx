'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Paper,
  GridLegacy as Grid,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Chip
} from '@mui/material';
import {
  X, 
  Users, 
  Camera, 
  AlertTriangle, 
  Clock,
  MapPin,
} from 'lucide-react';
import { styled } from '@mui/material/styles';

import { AttendanceDetails } from '@/data/types';
import UnrecognizedFaceCard from './UnrecognizedFaceCard';

interface AttendanceDetailsModalProps {
  open: boolean;
  onClose: () => void;
  attendanceData: AttendanceDetails | null;
}

// Styled Box for the stat cards
const StatBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
}));

const StatIconBox = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Helper component for TabPanel content
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`attendance-tabpanel-${index}`}
      aria-labelledby={`attendance-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function AttendanceDetailsModal({
  open,
  onClose,
  attendanceData,
}: AttendanceDetailsModalProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleManualMatch = (faceId: string) => {
    console.log(`Manual match for unrecognized face: ${faceId}`);
    
  };

  if (!attendanceData) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '0.5rem',
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h6" fontWeight="bold" className="flex items-center gap-2">
            <Users size={20} className="text-gray-600" /> {attendanceData.eventName} - Attendance Details
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {attendanceData.eventDateTime}
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <X />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        {/* Attendance Stats */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <StatBox display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Total Attendance
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {attendanceData.totalAttendance}
                    </Typography>
                </Box>
                <StatIconBox>
                    <Users size={28} className="text-gray-600" />
                </StatIconBox>
            </StatBox>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatBox display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Recognized
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" className="text-green-600" gutterBottom>
                        {attendanceData.recognized}
                    </Typography>
                </Box>
                <StatIconBox>
                    <Camera size={28} className="text-green-600" />
                </StatIconBox>
            </StatBox>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatBox display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Unmatched
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" className="text-orange-500" gutterBottom>
                        {attendanceData.unmatched}
                    </Typography>
                </Box>
                <StatIconBox>
                    <AlertTriangle size={28} className="text-orange-500" />
                </StatIconBox>
            </StatBox>
          </Grid>
        </Grid>

        {/* Tabs for Recognized/Unrecognized */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={handleTabChange} aria-label="attendance details tabs">
            <Tab sx={{ fontWeight: 'bold' }}  label={`Recognized Attendees (${attendanceData.recognizedAttendees.length})`} />
            <Tab sx={{ fontWeight: 'bold' }}  label={`Unrecognized Faces (${attendanceData.unrecognizedFacesCount})`} />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <CustomTabPanel value={selectedTab} index={0}>
          <Paper sx={{ p: 3}} variant='outlined'>
            <Typography variant="h6" fontWeight="bold" className="mb-3 text-gray-800">
                Successfully Recognized Members
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Members identified through facial recognition
            </Typography>
            <List>
                {attendanceData.recognizedAttendees.map((attendee) => (
                <Paper key={attendee.id} variant='outlined' sx={{ mb: 2, pl: 2, pr: 2, borderRadius: '0.5rem' }}>
                    <ListItem disableGutters secondaryAction={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>  
                            <Chip
                                sx={{ color: 'white', fontWeight: 'medium', backgroundColor: 
                                    attendee.matchPercentage > 90 ? '#16a34a' :
                                    attendee.matchPercentage > 60 ? '#ea580c' :
                                    '#dc2626'}}
                                label={`${attendee.matchPercentage}% match`}
                                size="small"
                                variant='outlined'
                                />
                            <Box sx={{borderColor: 'divider'}} className='p-6 rounded-md bg-gray-100'></Box>
                        </Box>
                    }>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: 'grey.300', mr: 2 }}>
                        {attendee.name.charAt(0)}
                    </Avatar>
                    <ListItemText
                        primary={
                        <Typography variant="body1" fontWeight="bold" className=" text-gray-800">
                            {attendee.name}
                        </Typography>
                        }
                        secondary={
                        <React.Fragment>
                            <Typography component="span" variant="body2" color="text.secondary">
                                ID: {attendee.memberId}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                                <Clock size={14} className="text-gray-500" />
                                <Typography component="span" variant="body2" color="text.secondary">
                                    {attendee.time}
                                </Typography>
                                <MapPin size={14} className="text-gray-500 ml-2" />
                                <Typography component="span" variant="body2" color="text.secondary">
                                    {attendee.location}
                                </Typography>
                            </Box>
                        </React.Fragment>
                        }
                    />
                    </ListItem>
                </Paper>
                ))}
            </List>
          </Paper>
        </CustomTabPanel>

        <CustomTabPanel value={selectedTab} index={1}>
          <Paper sx={{ p: 3 }} variant='outlined'>
            <Typography variant="h6" fontWeight="bold" className="mb-3 text-gray-800">
                Unrecognized Faces
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Faces that could not be matched to a member profile.
            </Typography>
                <Grid container spacing={3}>
                    {attendanceData.unrecognizedFaces.length > 0 ? (
                    attendanceData.unrecognizedFaces.map((face) => (
                        <Grid item xs={12} sm={6} md={4} key={face.id}>
                            <UnrecognizedFaceCard face={face} onManualMatch={handleManualMatch} />
                        </Grid>
                    ))
                    ) : (
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3, borderRadius: '0.5rem', textAlign: 'center', color: 'text.secondary' }}>
                        <Typography variant="body2">
                            No unrecognized faces to display for this session.
                        </Typography>
                        </Paper>
                    </Grid>
                    )}
                </Grid>
          </Paper>
        </CustomTabPanel>
      </DialogContent>
    </Dialog>
  );
}
