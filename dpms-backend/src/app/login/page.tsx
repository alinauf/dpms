'use client';

import api from '@/lib/axios';

interface LoginCredentials {
  email: string;
  password: string;
}

export default function LoginPage() {
  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      // Make the login request directly (no need for CSRF)
      const response = await api.post('/api/login', credentials);
      
      // Store the token
      localStorage.setItem('token', response.data.token);
      
      // Store user data or handle successful login
      // ... your login success logic
      
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  // ... rest of your component
} 