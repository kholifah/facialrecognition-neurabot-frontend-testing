
export interface UnmatchedImageData { 
  id: string;
  imageUrl: string;
  eventName: string;
  dateTime: string;
  location: String;
  matchProbability: number;
  status: 'pending' | 'matched' | 'rejected';
}

export interface MatchedImageData { 
  id: string;
  memberAvatarUrl?: string;
  memberName: string;
  memberId: string;
  eventName: string;
  eventDate: string;
  matchedByAdmin: string;
  matchedDateTime: string;
}

export interface RejectedImageData { 
  id: string;
  eventName: string;
  eventDate: string;
  reason: string;
  rejectedByAdmin: string;
  rejectedDateTime: string;
}
