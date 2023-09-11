// hooks/useAuth.js

export function useAuth() {
    const isAuthenticated = () => {
      return Boolean(localStorage.getItem('token'));
    };
  
    const storeToken = (token) => {
      localStorage.setItem('token', token);
    };
  
    return {
      isAuthenticated,
      storeToken
    };
  }
  