export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  userPreference?: string[];
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}
