export interface User {
  id: string;
  fullName: string;
  email: string;
  active: boolean;
  emailConfirmed: boolean;
  createdAt: Date;
  lastSignIn: Date;
  updatedAt: Date;
  profilePicture?: string;
  invitedAt?: Date;
}
