
export interface MemberData {
  id: string;
  name: string;
  memberId: string;
  email: string;
  joinedDate: string;
  lastSeenDate: string;
  status: 'active' | 'inactive';
  photosCount: number;
  photoStatus: 'Good coverage' | 'Need more photos' | 'No photos';
  memberAvatarUrl?: string;
}

export interface MemberDetails {
  id: string;
  name: string;
  memberId: string;
  email: string;
  phone: string;
  joinedDate: string;
  lastSeenDate: string;
  status: 'active' | 'inactive';
  photos: MemberPhoto[];
  photosCount: number;
  photoStatus: 'Good coverage' | 'Need more photos' | 'No photos';
  memberAvatarUrl?: string;
}

export interface MemberPhoto {
  id: string;
  url: string;
  uploadedDate: string;
  quality: 'high' | 'medium' | 'low';
}

export interface AttendanceHistoryEvent {
  id: string;
  eventName: string;
  dateTime: string;
  status: 'Present' | 'Absent' | 'Late';
}

export interface DetailedMemberData extends MemberData {
  phone: string;
  photos: MemberPhoto[];
  attendanceHistory: AttendanceHistoryEvent[];
}
