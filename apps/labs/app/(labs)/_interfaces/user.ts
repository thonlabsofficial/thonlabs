export interface User {
  id: string;
  fullName: string;
  email: string;
  active: boolean;
  createdAt: Date;
  lastSignIn: Date;
  updatedAt: Date;
  profilePicture?: string;
}
