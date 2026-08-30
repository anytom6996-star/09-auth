export interface User {
  username: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  username: string;
  email: string;
}