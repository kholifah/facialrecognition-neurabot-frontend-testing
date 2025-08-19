
import { EventData, AttendanceDetails, RecurringEventData, SpecialEventData } from '../types';

export const mockRecentEventSessions: EventData[] = [
  {
    id: '1', 
    title: 'Weekly Team Meeting',
    dateTime: '2025-01-19 at 10:00 AM',
    recognized: 245,
    unmatched: 22,
    total: 267,
  },
  {
    id: '2', 
    title: 'Team Building Session',
    dateTime: '2025-01-17 at 7:00 PM',
    recognized: 68,
    unmatched: 3,
    total: 71,
  },
  {
    id: '3', 
    title: 'Monthly Review',
    dateTime: '2025-01-15 at 7:30 PM',
    recognized: 49,
    unmatched: 3,
    total: 52,
  },
];

export const mockRecurringEvents: RecurringEventData[] = [
  {
    id: 'r1',
    title: 'Weekly Team Meeting',
    schedule: 'Every Monday at 10:00 AM',
    avgAttendance: 245,
    lastSessionAttendance: 267,
    status: 'active',
  },
  {
    id: 'r2',
    title: 'Monthly Review',
    schedule: 'First Wednesday at 7:30 PM',
    avgAttendance: 45,
    lastSessionAttendance: 52,
    status: 'active',
  },
  {
    id: 'r3',
    title: 'Team Building Session',
    schedule: 'Every Friday at 7:00 PM',
    avgAttendance: 68,
    lastSessionAttendance: 71,
    status: 'active',
  },
];

export const mockSpecialEvents: SpecialEventData[] = [
  {
    id: 's1',
    title: 'Annual Conference',
    dateTime: '2024-12-25 at 10:00 AM',
    attendance: 456,
    status: 'completed',
  },
  {
    id: 's2',
    title: 'New Year Kickoff',
    dateTime: '2025-01-01 at 11:00 PM',
    attendance: 234,
    status: 'completed',
  },
  {
    id: 's3',
    title: 'Spring Workshop',
    dateTime: '2025-04-20 at 10:00 AM',
    attendance: 'TBD',
    status: 'upcoming',
  },
];


export const mockAttendanceDetails: Record<string, AttendanceDetails> = {
  '1': { 
    eventId: '1',
    eventName: 'Weekly Team Meeting',
    eventDateTime: '2025-01-19 at 10:00 AM',
    totalAttendance: 267,
    recognized: 245,
    unmatched: 22,
    recognizedAttendees: [
      { id: 'att1', name: 'Alice Tan', memberId: 'ID: 001', time: '10:05 AM', location: 'Main Entrance', matchPercentage: 95, avatarUrl: 'https://placehold.co/40x40/FF5733/FFFFFF?text=AT' },
      { id: 'att2', name: 'Benjamin Lee', memberId: 'ID: 002', time: '10:12 AM', location: 'Side Entrance', matchPercentage: 88, avatarUrl: 'https://placehold.co/40x40/33FF57/FFFFFF?text=BL' },
      { id: 'att3', name: 'Carmen Wong', memberId: 'ID: 003', time: '10:08 AM', location: 'Main Entrance', matchPercentage: 92, avatarUrl: 'https://placehold.co/40x40/3357FF/FFFFFF?text=CW' },
    ],
    unrecognizedFacesCount: 2,
    unrecognizedFaces: [
      {
        id: 'uf1',
        imageUrl: 'https://placehold.co/200x180/E0E0E0/A0A0A0?text=Unrecognized+1',
        detectedTime: '10:15 AM',
        location: 'Fellowship Hall',
        probability: 45,
      },
      {
        id: 'uf2',
        imageUrl: 'https://placehold.co/200x180/E0E0E0/A0A0A0?text=Unrecognized+2',
        detectedTime: '10:22 AM',
        location: 'Main Entrance',
        probability: 38,
      },
    ],
  },
  
  '2': { 
    eventId: '2',
    eventName: 'Team Building Session',
    eventDateTime: '2025-01-17 at 7:00 PM',
    totalAttendance: 71,
    recognized: 68,
    unmatched: 3,
    recognizedAttendees: [
      { id: 'att4', name: 'David Lim', memberId: 'ID: 004', time: '07:05 PM', location: 'Room A', matchPercentage: 90 },
    ],
    unrecognizedFacesCount: 3,
    unrecognizedFaces: [],
  },
  '3': { 
    eventId: '3',
    eventName: 'Monthly Review',
    eventDateTime: '2025-01-15 at 7:30 PM',
    totalAttendance: 52,
    recognized: 49,
    unmatched: 3,
    recognizedAttendees: [
      { id: 'att5', name: 'Emily Chen', memberId: 'ID: 005', time: '07:32 PM', location: 'Conference Room', matchPercentage: 93 },
    ],
    unrecognizedFacesCount: 3,
    unrecognizedFaces: [],
  },
  's1': { 
    eventId: 's1',
    eventName: 'Annual Conference',
    eventDateTime: '2024-12-25 at 10:00 AM',
    totalAttendance: 456,
    recognized: 400,
    unmatched: 56,
    recognizedAttendees: [
      { id: 'att_s1_1', name: 'John Doe', memberId: 'ID: 100', time: '09:55 AM', location: 'Main Hall', matchPercentage: 98 },
    ],
    unrecognizedFacesCount: 56,
    unrecognizedFaces: [], 
  },
};
