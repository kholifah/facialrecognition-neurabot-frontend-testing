
'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  TextField,
  Button,
  Chip,
  Avatar,
  InputAdornment,
  Select, 
  MenuItem,
} from '@mui/material';
import {
  X,
  User,
  Plus,
  Trash2,
} from 'lucide-react';

import { DetailedMemberData } from '@/data/types';
import { mockDetailedMemberData } from '@/data/mock'; 
import AttendanceHistoryEventCard from './AttendanceHistoryEventCard'; 

interface MemberDetailsModalProps {
  open: boolean;
  onClose: () => void;
  memberData: DetailedMemberData | null;
  onSaveMember: (updatedMemberData: DetailedMemberData) => void;
  onAddPhoto: (memberId: string, file: File) => void;
  onRemovePhoto: (memberId: string, photoId: string) => void;
}

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
      id={`member-detail-tabpanel-${index}`}
      aria-labelledby={`member-detail-tab-${index}`}
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

export default function MemberDetailsModal({
  open,
  onClose,
  memberData,
  onSaveMember, 
  onAddPhoto,   
  onRemovePhoto,
}: MemberDetailsModalProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false); 
  
  const [editableMemberData, setEditableMemberData] = useState<DetailedMemberData | null>(memberData);

  // Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update local state when memberData prop changes (e.g., when a new member is viewed)
  useEffect(() => {
    setEditableMemberData(memberData);
    setIsEditing(false); 
  }, [memberData]);

  if (!memberData) {
    return null; 
  }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setSelectedTab(newValue);
    };

  // Handle changes in editable TextFields
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableMemberData(prev => prev ? { ...prev, [name]: value } : null);
  };

  // Handle status change in Select component
  const handleStatusChange = (e: any) => {
    const newStatus = e.target.value as 'active' | 'inactive';
    setEditableMemberData(prev => prev ? { ...prev, status: newStatus } : null);
  };


  const handleSave = () => {
    if (editableMemberData) {
      onSaveMember(editableMemberData);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditableMemberData(memberData); 
    setIsEditing(false); 
  };

  // Trigger click on hidden file input
  const handleAddPhotoClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection from input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && memberData) {
      const file = event.target.files[0]; 
      if (file) {
        onAddPhoto(memberData.id, file); 
      }
      event.target.value = ''; 
    }
  };


  const statusChipColor = memberData.status === 'active' ? 'success' : 'default';
  const photoQualityColor = (quality: 'high' | 'medium' | 'low') => {
    switch (quality) {
      case 'high': return 'success';
      case 'medium': return 'warning';
      case 'low': return 'error';
      default: return 'default';
    }
  };

  // Use editableMemberData for form fields if available, otherwise fallback to memberData
  const displayMemberData = editableMemberData || memberData;

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
          <Typography variant="h6" fontWeight='bold' component="h2" className="flex items-center gap-2 text-gray-800">
            <User size={20} className="text-gray-600" /> Member Details - {memberData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage member information and facial recognition photos
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
        {/* Member Information Section */}
        <Paper variant='outlined' sx={{ p: 3, mb: 4, borderRadius: '0.5rem' }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={3} display="flex" justifyContent="center">
                  <Avatar sx={{ width: 130, height: 130, bgcolor: 'grey.300' }}>
                      {memberData.memberAvatarUrl ? (
                          <img src={memberData.memberAvatarUrl} alt={memberData.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                          memberData.name.charAt(0)
                      )}
                  </Avatar>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight='bold' className=" text-gray-800">
                  Member Information
                </Typography>
                {isEditing ? (
                  <Box display="flex" gap={1}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ textTransform: 'capitalize', borderRadius: '0.5rem' }}
                      onClick={handleSave}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ textTransform: 'capitalize', borderRadius: '0.5rem' }}
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ textTransform: 'capitalize', borderRadius: '0.5rem' }}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Member
                  </Button>
                )}
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    name="name"
                    value={displayMemberData.name}
                    onChange={handleFieldChange}
                    fullWidth
                    InputProps={{ readOnly: !isEditing }}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Member ID"
                    name="memberId"
                    value={displayMemberData.memberId}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={displayMemberData.email}
                    onChange={handleFieldChange}
                    fullWidth
                    InputProps={{ readOnly: !isEditing }}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    name="phone"
                    value={displayMemberData.phone}
                    onChange={handleFieldChange}
                    fullWidth
                    InputProps={{ readOnly: !isEditing }}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Join Date"
                    name="joinDate" 
                    value={displayMemberData.joinedDate}
                    onChange={handleFieldChange}
                    fullWidth
                    InputProps={{ readOnly: !isEditing }} 
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {isEditing ? (
                    <Select
                      label="Status" 
                      name="status"
                      value={displayMemberData.status}
                      onChange={handleStatusChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  ) : (
                    <TextField
                      label="Status"
                      value={displayMemberData.status.charAt(0).toUpperCase() + displayMemberData.status.slice(1)}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Chip label={displayMemberData.status} color={statusChipColor} size="small" sx={{ textTransform: 'capitalize' }} />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      size="small"
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {/* Tabs for Photos / Attendance History */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={selectedTab} onChange={handleTabChange} aria-label="member details tabs">
            <Tab sx={{ fontWeight: 'bold' }}  label={`Photos (${displayMemberData.photos.length})`} />
            <Tab sx={{ fontWeight: 'bold' }}  label="Attendance History" />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <CustomTabPanel value={selectedTab} index={0}>
          <Paper variant='outlined' sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Box>
                <Typography variant="h6" fontWeight='bold' className=" text-gray-800">
                  Facial Recognition Photos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Photos used for facial recognition training. Minimum 3 photos recommended.
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="small"
                startIcon={<Plus size={18} />}
                sx={{ textTransform: 'capitalize', borderRadius: '0.5rem' }}
                onClick={handleAddPhotoClick}
              >
                Add Photo
              </Button>
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*" 
                multiple 
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }} 
              />
            </Box>

            <Grid container spacing={3}>
              {displayMemberData.photos.length > 0 ? (
                displayMemberData.photos.map((photo) => (
                  <Grid item xs={12} sm={6} md={4} key={photo.id}>
                    <Paper variant='outlined' sx={{ p: 2, borderRadius: '0.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box sx={{ height: 150, width: '100%', bgcolor: 'grey.200', mb: 2, display: 'flex', alignItems: 'center', overflow: 'hidden', borderRadius: '0.5rem' }}>
                        {photo.url ? (
                          <img
                            src={photo.url}
                            alt={`Photo ${photo.id}`}
                            style={{ width: '100%', objectFit: 'contain' }}
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/150x150/E0E0E0/A0A0A0?text=No+Image'; }} // Fallback image
                          />
                        ) : (
                          <Typography variant="caption" color="text.secondary">No Image</Typography>
                        )}
                      </Box>
                      <Box mb={1}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" fontWeight='bold' className=" text-gray-800">
                            Photo {photo.id}
                          </Typography>
                          <Chip
                            label={photo.quality}
                            color={photoQualityColor(photo.quality)}
                            size="small"
                            sx={{ textTransform: 'capitalize' }}
                          />
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                          Uploaded: {photo.uploadedDate}
                        </Typography>
                      </Box>
                    
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Trash2 size={16} />}
                        sx={{ textTransform: 'capitalize', borderRadius: '0.5rem' }}
                        onClick={() => onRemovePhoto(memberData.id, photo.id)}
                      >
                        Remove
                      </Button>
                    </Paper>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Paper sx={{ p: 3, borderRadius: '0.5rem', textAlign: 'center', color: 'text.secondary' }}>
                    <Typography variant="body2">
                      No photos available for this member. Click "Add Photo" to upload.
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Paper>
        </CustomTabPanel>

        <CustomTabPanel value={selectedTab} index={1}>
          <Paper variant='outlined' sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight='bold' className=" text-gray-800 mb-3">
              Recent Attendance
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Latest organization events attended.
            </Typography>
            <Grid container spacing={2}> 
              {mockDetailedMemberData['m1'].attendanceHistory ? (
                mockDetailedMemberData['m1'].attendanceHistory.map((event) => (
                  <Grid item xs={12} key={event.id}> 
                    <AttendanceHistoryEventCard
                      id={event.id}
                      eventName={event.eventName}
                      dateTime={event.dateTime}
                      status={event.status}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Paper sx={{ p: 3, borderRadius: '0.5rem', textAlign: 'center', color: 'text.secondary' }}>
                    <Typography variant="body2">
                      No attendance history to display yet.
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
