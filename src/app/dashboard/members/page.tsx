'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  InputAdornment,
  GridLegacy as Grid,
  Select,
  MenuItem,
} from '@mui/material';
import { Plus, Search, Filter } from 'lucide-react';
import StatCard from '@/components/StatCard'; 
import MemberListSection from '@/components/MemberListSection'; 
import MemberDetailsModal from '@/components/MemberDetailModal';

import { DetailedMemberData } from '@/data/types';
import { mockMemberStatsData, mockInitialMembersData, mockDetailedMemberData } from '@/data/mock';


export default function MembersPage() {
  const [members, setMembers] = useState(mockInitialMembersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [memberDetailsModalOpen, setMemberDetailsModalOpen] = useState(false);
  const [selectedMemberData, setSelectedMemberData] = useState<DetailedMemberData | null>(null);
  

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.memberId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === '' || member.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleAddMember = () => {
    console.log('Add Member clicked');
  };

 const handleViewDetails = (memberId: string) => {
    const member = mockDetailedMemberData[memberId];
    if (member) {
      setSelectedMemberData(member);
      setMemberDetailsModalOpen(true);
    }
  };

  const handleViewPhotos = (memberId: string) => {
    console.log(`View photos for member: ${memberId}`);
  };

  const handleStatusChange = (memberId: string, newStatus: 'active' | 'inactive') => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId ? { ...member, status: newStatus } : member
      )
    );
    console.log(`Member ${memberId} status changed to ${newStatus}`);
  };

  const handleAddPhoto = (memberId: string, file: File) => {
    console.log(`Adding photo for member ${memberId}:`, file.name);
    const newPhoto = {
      id: `photo_${Date.now()}`, 
      url: URL.createObjectURL(file), 
      uploadedDate: new Date().toISOString().split('T')[0], 
      quality: 'medium' as 'high' | 'medium' | 'low', 
    };

    setSelectedMemberData((prevData) => {
      if (!prevData) return null;
      return {
        ...prevData,
        photos: [...prevData.photos, newPhoto],
      };
    });

    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId
          ? { ...member, photosCount: member.photosCount + 1, photoStatus: 'Good coverage' } 
          : member
      )
    );
  };

  const handleRemovePhoto = (memberId: string, photoId: string) => {
    console.log(`Removing photo ${photoId} for member ${memberId}`);

    setSelectedMemberData((prevData) => {
      if (!prevData) return null;
      return {
        ...prevData,
        photos: prevData.photos.filter((photo) => photo.id !== photoId),
      };
    });

    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId
          ? { ...member, photosCount: member.photosCount - 1, photoStatus: member.photosCount - 1 === 0 ? 'No photos' : 'Need more photos' } 
          : member
      )
    );
  };
  const handleSaveMember = (updatedMemberData: DetailedMemberData) => {
    console.log('Saving member data:', updatedMemberData);
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === updatedMemberData.id
          ? {
              ...member,
              name: updatedMemberData.name,
              email: updatedMemberData.email,
              status: updatedMemberData.status, 
            }
          : member
      )
    );
    setSelectedMemberData(updatedMemberData);
    setMemberDetailsModalOpen(false); 
  };

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight='bold' className=" text-gray-800">
            Members Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage organization members and their facial recognition photos
          </Typography>
        </Box>
        <Button
          size='medium'
          variant="contained"
          sx={{ px: 2, py: 1, boxShadow: 0, borderRadius: '0.5rem' }}
          startIcon={<Plus size={20} />}
          onClick={handleAddMember}
        >
          Add Member
        </Button>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'grey.50', overflowY: 'auto' }}>
        {/* Stats Cards Section */}
        <Grid container spacing={3} mb={4}>
          {mockMemberStatsData.map((stat, index) => (
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

        {/* Search and Filter Section */}
        <Paper elevation={0} sx={{mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, borderRadius: '0.5rem' }}>
          <TextField
            fullWidth
            placeholder="Search members by name, email, or ID..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as string)}
            displayEmpty
            size='small'
            startAdornment={
              <InputAdornment position="start">
                <Filter size={20} className="text-gray-400" />
              </InputAdornment>
            }
            IconComponent={() => null} 
            renderValue={(selected) => selected === '' ? "Filter" : (selected === 'active' ? 'Active' : 'Inactive')}
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
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </Paper>

        {/* Members List Section */}
        <MemberListSection
          title="Organization Members"
          description={`Showing ${filteredMembers.length} of ${mockInitialMembersData.length} members`}
          members={filteredMembers}
          onViewDetails={handleViewDetails}
          onViewPhotos={handleViewPhotos}
          onStatusChange={handleStatusChange}
        />
        
        {/* Member Details Modal */}
        <MemberDetailsModal
          open={memberDetailsModalOpen}
          onClose={() => setMemberDetailsModalOpen(false)}
          memberData={selectedMemberData}
          onSaveMember={handleSaveMember} 
          onAddPhoto={handleAddPhoto}     
          onRemovePhoto={handleRemovePhoto} 
        />

      </Box>
    </Box>
  );
}
