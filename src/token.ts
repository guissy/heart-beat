import { createContext, useState } from 'react';

export const LoginContext = createContext({} as any);

export function useToken(): { token: string, setToken: any } {
  const [token, setToken] = useState('');
  return { token, setToken };
}