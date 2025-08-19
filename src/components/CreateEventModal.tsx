'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Box,
  Typography,
  InputAdornment,
} from '@mui/material';
import {
  X,
  Calendar as CalendarIcon,
  Clock as TimeIcon,
  ChevronDown as ExpandMoreIcon,
} from 'lucide-react';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';

// Styled components using Emotion
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    padding: '0',
    maxWidth: '500px',
    width: '90%',
    margin: '16px',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e0e0e0',
    '&:hover': {
      borderColor: '#b0b0b0',
    },
    '&.Mui-focused': {
      borderColor: '#1976d2',
      boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.1)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiInputLabel-root': {
    color: '#666',
    fontSize: '14px',
    fontWeight: 500,
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: '#f8f9fa',
  border: '1px solid #e0e0e0',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover': {
    borderColor: '#b0b0b0',
  },
  '&.Mui-focused': {
    borderColor: '#1976d2',
    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.1)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '14px',
  padding: '10px 24px',
  '&.MuiButton-contained': {
    backgroundColor: '#1976d2',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: '#1565c0',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    },
  },
  '&.MuiButton-outlined': {
    borderColor: '#e0e0e0',
    color: '#666',
    '&:hover': {
      borderColor: '#b0b0b0',
      backgroundColor: '#f5f5f5',
    },
  },
}));

interface CreateEventModalProps {
  open: boolean;
  onClose: () => void;
  onCreateEvent: (eventData: EventData) => void;
}

interface EventData {
  eventType: string;
  eventName: string;
  description: string;
  eventDate: Dayjs | null;
  eventTime: Dayjs | null;
}

const eventTypes = [
  'Recurring Event',
  'One-Time Event',
  'Special Event',
];

export default function CreateEventModal({
  open,
  onClose,
  onCreateEvent,
}: CreateEventModalProps) {
  const [formData, setFormData] = useState<EventData>({
    eventType: '',
    eventName: '',
    description: '',
    eventDate: null,
    eventTime: null,
  });

  const handleInputChange = (field: keyof EventData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onCreateEvent(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      eventType: '',
      eventName: '',
      description: '',
      eventDate: null,
      eventTime: null,
    });
    onClose();
  };

  const isFormValid = formData.eventType && formData.eventName && formData.eventDate;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
               
          <Box>
            <Typography variant="h6" fontWeight='bold' component="h2" className="flex items-center gap-2 text-gray-800">
             Create New Event
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add a new organization event to the system for attendance tracking.
            </Typography>
          </Box>
  
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <X />
          </IconButton>
        </DialogTitle>
        <DialogContent className="p-2">
          {/* Form */}
          <Box>
            {/* Event Type */}
            <Box className='mb-4'>
              <Typography variant="subtitle2" fontWeight='bold' className="mb-2 text-gray-700">
                Event Type
              </Typography>
              <FormControl fullWidth>
                <StyledSelect
                  value={formData.eventType}
                  onChange={(e) => handleInputChange('eventType', e.target.value)}
                  displayEmpty
                  IconComponent={ExpandMoreIcon}
                >
                  <MenuItem value="" disabled>
                    <span className="text-gray-500">Select event type</span>
                  </MenuItem>
                  {eventTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </StyledSelect>
              </FormControl>
            </Box>

            {/* Event Name */}
            <Box className='mb-4'>
              <Typography variant="subtitle2" fontWeight='bold' className="mb-2 text-gray-700">
                Event Name
              </Typography>
              <StyledTextField
                fullWidth
                placeholder="e.g., Weekly Team Meeting"
                value={formData.eventName}
                onChange={(e) => handleInputChange('eventName', e.target.value)}
                variant="outlined"
                autoFocus
              />
            </Box>

            {/* Description */}
            <Box className='mb-4'>
              <Typography variant="subtitle2" fontWeight='bold' className="mb-2 text-gray-700">
                Description
              </Typography>
              <StyledTextField
                fullWidth
                multiline
                rows={4}
                placeholder="Brief description of the event"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                variant="outlined"
              />
            </Box>

            {/* Event Date */}
            <Box className='mb-4'>
              <Typography variant="subtitle2" fontWeight='bold' className="mb-2 text-gray-700">
                Event Date
              </Typography>
              <DatePicker
                value={formData.eventDate}
                onChange={(date) => handleInputChange('eventDate', date)}
                enableAccessibleFieldDOMStructure={false}
                slots={{
                  textField: (props) => {
                    const { 
                      areAllSectionsEmpty, 
                      sectionListRef, 
                      sectionsContainer, 
                      clearable, 
                      onClear,
                      ...textFieldProps 
                    } = props;
                    
                    return (
                      <StyledTextField
                        {...textFieldProps}
                        fullWidth
                        placeholder="Pick a date"
                        InputProps={{
                          ...textFieldProps.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarIcon size={20} className="text-gray-500" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    );
                  },
                }}
              />
            </Box>

            {/* Time */}
            <Box className='mb-4'>
              <Typography variant="subtitle2" fontWeight='bold' className="mb-2 text-gray-700">
                Time
              </Typography>
              <TimePicker
                value={formData.eventTime}
                onChange={(time) => handleInputChange('eventTime', time)}
                enableAccessibleFieldDOMStructure={false}
                slots={{
                  textField: (props) => {
                    const { 
                      areAllSectionsEmpty, 
                      sectionListRef, 
                      sectionsContainer, 
                      clearable, 
                      onClear,
                      ...textFieldProps 
                    } = props;
                    
                    return (
                      <StyledTextField
                        {...textFieldProps}
                        fullWidth
                        placeholder="--:--"
                        InputProps={{
                          ...textFieldProps.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <TimeIcon size={20} className="text-gray-500" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    );
                  },
                }}
              />
            </Box>
          </Box>
        </DialogContent>

        {/* Actions */}
        <DialogActions className="p-4">
          <StyledButton
            variant="outlined"
            onClick={handleClose}
            className="mr-3"
          >
            Cancel
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Create Event
          </StyledButton>
        </DialogActions>
      </StyledDialog>
    </LocalizationProvider>
  );
}
