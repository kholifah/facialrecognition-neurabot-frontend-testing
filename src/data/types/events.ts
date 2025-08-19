
export interface EventData { 
  id: string; 
  title: string;
  dateTime: string;
  recognized: number;
  unmatched: number;
  total: number;
}

export interface RecurringEventData {
  id: string;
  title: string;
  schedule: string;
  avgAttendance: number;
  lastSessionAttendance: number;
  status: 'active' | 'inactive';
}

export interface SpecialEventData {
  id: string;
  title: string;
  dateTime: string;
  attendance: number | 'TBD';
  status: 'completed' | 'upcoming' | 'TBD';
}

export interface RecognizedAttendee {
  id: string;
  name: string;
  memberId: string;
  time: string;
  location: string;
  matchPercentage: number;
  avatarUrl?: string;
}

export interface UnrecognizedFace {
  id: string;
  imageUrl: string;
  detectedTime: string;
  location: string;
  probability: number;
}

export interface AttendanceDetails {
  eventId: string;
  eventName: string;
  eventDateTime: string;
  totalAttendance: number;
  recognized: number;
  unmatched: number;
  recognizedAttendees: RecognizedAttendee[];
  unrecognizedFacesCount: number;
  unrecognizedFaces: UnrecognizedFace[];
}
