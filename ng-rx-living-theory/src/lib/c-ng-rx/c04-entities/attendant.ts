export type InvitationStatus = 'awaiting' | 'invited' | 'confirmed' | 'declined';

export interface Attendant {
  id: number;
  name: string;
  email: string;
  status: InvitationStatus;
}
