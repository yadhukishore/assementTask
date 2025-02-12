import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../components/auth/state/auth';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAuth = () => {
  const setAuth = useSetRecoilState(authState);
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');

    if (token && user) {
      setAuth({
        token,
        user: JSON.parse(user),
        isAuthenticated: true,
      });
      
      if (location.pathname === '/login') {
        navigate('/', { replace: true });
      }
    } else if (!token && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [setAuth, navigate, location.pathname]);

  return auth;
};