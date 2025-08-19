
import { UnmatchedImageData, MatchedImageData, RejectedImageData } from '../types';
import { AlertTriangle, CheckCircle, XCircle, Camera } from 'lucide-react';

export const mockUnmatchedStatsData = [
  {
    title: 'Pending Review',
    value: '4', 
    subtitle: '',
    icon: AlertTriangle,
    color: '#f59e0b',
    bgColor: '#fef3c7',
  },
  {
    title: 'Matched Today',
    value: '2', 
    subtitle: '',
    icon: CheckCircle,
    color: '#10b981',
    bgColor: '#ecfdf5',
  },
  {
    title: 'Rejected',
    value: '1', 
    subtitle: '',
    icon: XCircle,
    color: '#ef4444',
    bgColor: '#fee2e2',
  },
  {
    title: 'Success Rate',
    value: '87%',
    subtitle: '',
    icon: Camera,
    color: '#3b82f6',
    bgColor: '#eff6ff',
  },
];

export const mockMatchedImages: MatchedImageData[] = [
  {
    id: 'img5',
    memberAvatarUrl: 'https://placehold.co/40x40/E0E0E0/FFFFFF?text=AT',
    memberName: 'Alice Tan',
    memberId: '001',
    eventName: 'Sunday Morning Service',
    eventDate: '2025-01-19',
    matchedByAdmin: 'Admin',
    matchedDateTime: '2025-01-19 16:30',
  },
  {
    id: 'img6',
    memberAvatarUrl: 'https://placehold.co/40x40/E0E0E0/FFFFFF?text=BL',
    memberName: 'Benjamin Lee',
    memberId: '002',
    eventName: 'Youth Fellowship',
    eventDate: '2025-01-17',
    matchedByAdmin: 'Admin',
    matchedDateTime: '2025-01-18 09:10',
  },
];

export const mockRejectedImages: RejectedImageData[] = [
  {
    id: 'img7',
    eventName: 'Prayer Meeting',
    eventDate: '2025-01-15',
    reason: 'Poor image quality',
    rejectedByAdmin: 'Admin',
    rejectedDateTime: '2025-01-16 10:00',
  },
];

export const initialUnmatchedImages: UnmatchedImageData[] = [
  {
    id: 'img1',
    imageUrl: 'https://placehold.co/200x180/E0E0E0/A0A0A0?text=Face+1',
    eventName: 'Sunday Morning Service',
    dateTime: '2025-01-19 at 10:00 AM',
    location: 'Main Entrance',
    matchProbability: 65,
    status: 'pending',
  },
  {
    id: 'img2',
    imageUrl: 'https://placehold.co/200x180/E0E0E0/A0A0A0?text=Face+2',
    eventName: 'Youth Fellowship',
    dateTime: '2025-01-18 at 7:00 PM',
    location: 'Fellowship Hall',
    matchProbability: 40,
    status: 'pending',
  },
  {
    id: 'img3',
    imageUrl: 'https://placehold.co/200x180/E0E0E0/A0A0A0?text=Face+3',
    eventName: 'Prayer Meeting',
    dateTime: '2025-01-17 at 7:30 PM',
    location: 'Prayer Room',
    matchProbability: 70,
    status: 'pending',
  },
  {
    id: 'img4',
    imageUrl: 'https://placehold.co/200x180/E0E0E0/A0A0A0?text=Face+4',
    eventName: 'Sunday Morning Service',
    dateTime: '2025-01-12 at 10:00 AM',
    location: 'Side Entrance',
    matchProbability: 35,
    status: 'pending',
  },
  {
    id: 'img5',
    imageUrl: 'https://placehold.co/200x180/E0E0E0/A0A0A0?text=Matched+Face+1',
    eventName: 'Weekly Team Meeting',
    dateTime: '2025-01-10 at 11:00 AM',
    location: 'Side Entrance',
    matchProbability: 90,
    status: 'matched',
  },
  {
    id: 'img6',
    imageUrl: 'https://placehold.co/200x180/E0E0E0/A0A0A0?text=Rejected+Face+1',
    eventName: 'Volunteer Gathering',
    dateTime: '2025-01-05 at 2:00 PM',
    location: 'Side Entrance',
    matchProbability: 20,
    status: 'rejected',
  },
];
