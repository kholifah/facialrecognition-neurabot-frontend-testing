'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  GridLegacy as Grid,
  Tabs,
  Tab,
  Tooltip,
  Chip,
  MenuItem,
  Select,
} from '@mui/material';
import { Search, AlertTriangle, Filter } from 'lucide-react';

import StatCard from '@/components/StatCard'; 
import UnmatchedImageCard from '@/components/UnmatchedImageCard'; 
import MatchedImageCard from '@/components/MatchedImageCard'; 
import RejectedImageCard from '@/components/RejectedImageCard'; 

import { UnmatchedImageData, MatchedImageData, RejectedImageData } from '@/data/types';
import { initialUnmatchedImages, mockUnmatchedStatsData, mockMatchedImages, mockRejectedImages } from '@/data/mock';

export default function UnmatchedImagesPage() {
  const [unmatchedImages, setUnmatchedImages] = useState<UnmatchedImageData[]>(initialUnmatchedImages);
  const [matchedImages, setMatchedImages] = useState<MatchedImageData[]>(mockMatchedImages);
  const [rejectedImages, setRejectedImages] = useState<RejectedImageData[]>(mockRejectedImages);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleMatch = (imageId: string) => {
    console.log(`Matching image: ${imageId}`);
    
    const imageToMatch = unmatchedImages.find(img => img.id === imageId);
    if (imageToMatch) {
      setUnmatchedImages(prev => prev.filter(img => img.id !== imageId));
      
      const newMatchedImage: MatchedImageData = {
        id: imageToMatch.id,
        memberAvatarUrl: 'https://placehold.co/40x40/E0E0E0/FFFFFF?text=M', 
        memberName: 'New Matched Member', 
        memberId: 'ID: XXX', 
        eventName: imageToMatch.eventName,
        eventDate: imageToMatch.dateTime.split(' at ')[0],
        matchedByAdmin: 'Admin',
        matchedDateTime: new Date().toLocaleString(),
      };
      setMatchedImages(prev => [newMatchedImage, ...prev]);
    }
  };

  const handleReject = (imageId: string) => {
    console.log(`Rejecting image: ${imageId}`);
    
    const imageToReject = unmatchedImages.find(img => img.id === imageId);
    if (imageToReject) {
      setUnmatchedImages(prev => prev.filter(img => img.id !== imageId));
      
      const newRejectedImage: RejectedImageData = {
        id: imageToReject.id,
        eventName: imageToReject.eventName,
        eventDate: imageToReject.dateTime.split(' at ')[0],
        reason: 'Manually rejected by user',
        rejectedByAdmin: 'Admin',
        rejectedDateTime: new Date().toLocaleString(),
      };
      setRejectedImages(prev => [newRejectedImage, ...prev]);
    }
  };

  // Filter logic for each tab
  const getFilteredContent = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    switch (selectedTab) {
      case 0: // Pending Review
        return unmatchedImages.filter(img =>
          img.eventName.toLowerCase().includes(lowerCaseSearchTerm) ||
          img.dateTime.toLowerCase().includes(lowerCaseSearchTerm)
        ).map(image => (
          <Grid item xs={12} sm={6} md={3} key={image.id}>
            <UnmatchedImageCard
              id={image.id}
              imageUrl={image.imageUrl}
              eventName={image.eventName}
              dateTime={image.dateTime}
              location={image.location}
              matchProbability={image.matchProbability}
              onMatch={handleMatch}
              onReject={handleReject}
            />
          </Grid>
        ));
      case 1: // Recently Matched
        return matchedImages.filter(img =>
          img.memberName.toLowerCase().includes(lowerCaseSearchTerm) ||
          img.memberId.toLowerCase().includes(lowerCaseSearchTerm) ||
          img.eventName.toLowerCase().includes(lowerCaseSearchTerm) ||
          img.eventDate.toLowerCase().includes(lowerCaseSearchTerm)
        ).map(image => (
          <Grid item xs={12} key={image.id}> 
            <MatchedImageCard
              id={image.id}
              memberAvatarUrl={image.memberAvatarUrl}
              memberName={image.memberName}
              memberId={image.memberId}
              eventName={image.eventName}
              eventDate={image.eventDate}
              matchedByAdmin={image.matchedByAdmin}
              matchedDateTime={image.matchedDateTime}
            />
          </Grid>
        ));
      case 2: // Rejected
        return rejectedImages.filter(img =>
          img.eventName.toLowerCase().includes(lowerCaseSearchTerm) ||
          img.eventDate.toLowerCase().includes(lowerCaseSearchTerm) ||
          img.reason.toLowerCase().includes(lowerCaseSearchTerm)
        ).map(image => (
          <Grid item xs={12} key={image.id}> 
            <RejectedImageCard
              id={image.id}
              eventName={image.eventName}
              eventDate={image.eventDate}
              reason={image.reason}
              rejectedByAdmin={image.rejectedByAdmin}
              rejectedDateTime={image.rejectedDateTime}
            />
          </Grid>
        ));
      default:
        return [];
    }
  };

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight='bold' className="font-semibold text-gray-800">
            Unmatched Images
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review and manually match unrecognized faces.
          </Typography>
        </Box>
        <Tooltip title="Help with Unmatched Images">
          <Chip color='warning' size='small' className='bg-orange-600' sx={{ bgcolor: 'bg-orange-600', fontWeight: 'bold'}} icon={<AlertTriangle size={14} />} label="4 Pending" variant="outlined"/>
        </Tooltip>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'grey.50', overflowY: 'auto' }}>
        {/* Stats Cards Section */}
        <Grid container spacing={3} mb={4}>
          {mockUnmatchedStatsData.map((stat, index) => (
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
        <Paper elevation={0} sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, borderRadius: '0.5rem' }}>
          <TextField
            fullWidth
            placeholder="Search by event name, date, or location..."
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
            <Tabs value={selectedTab} onChange={handleTabChange} aria-label="unmatched images tabs">
              <Tab sx={{ fontWeight: 'bold' }}  label={`Pending Review (${unmatchedImages.length})`} />
              <Tab sx={{ fontWeight: 'bold' }}  label={`Recently Matched (${matchedImages.length})`} />
              <Tab sx={{ fontWeight: 'bold' }}  label={`Rejected (${rejectedImages.length})`} />
            </Tabs>
          </Box>

          {/* Images Section */}
          <Paper variant='outlined' sx={{ p: 3, borderRadius: '0.5rem' }}>
            <Typography variant="h5" component="h2" fontWeight='bold' className=" text-gray-800 mb-2">
              {selectedTab === 0 && 'Images Awaiting Manual Review'}
              {selectedTab === 1 && 'Recently Matched Images'}
              {selectedTab === 2 && 'Rejected Images'}
            </Typography>
            <Typography variant="body1" color="text.secondary" className="mb-4">
              {selectedTab === 0 && 'Click on an image to manually match with a member.'}
              {selectedTab === 1 && 'Images that have been successfully matched to members.'}
              {selectedTab === 2 && 'Images that were rejected due to poor quality or other reasons.'}
            </Typography>
            <Grid container spacing={3} className="pt-4">
              {getFilteredContent().length > 0 ? (
                getFilteredContent()
              ) : (
                <Grid item xs={12}>
                  <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                    <Typography variant="body2">
                      No images found for this category.
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>
      </Box>
    </Box>
  );
}
