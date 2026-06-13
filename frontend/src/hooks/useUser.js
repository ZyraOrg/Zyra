import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api, { setOnSessionExpired } from '../services/api';
import useAuthStore from '../store/useAuthStore';

const PUBLIC_ROUTES = ['/', '/login', '/signup', '/auth/callback', '/admin/login'];

export const useUser = () => {
  const { setUser, setLoading, logout } = useAuthStore();
  const { pathname } = useLocation();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // When a refresh ultimately fails, the session is over: drop the user so
  // ProtectedRoute redirects to /login (tokens are already cleared in api.js).
  useEffect(() => {
    setOnSessionExpired(() => logout());
  }, [logout]);

  const query = useQuery({
    queryKey: ['user'],
    queryFn: api.getUser,
    retry: false,
    enabled: !isPublicRoute,
  });

  useEffect(() => {
    if (isPublicRoute) {
      setLoading(false);
      return;
    }
    if (query.isSuccess) setUser(query.data?.data?.user ?? null);
    // if (query.isError) setUser(null); // don't wipe persisted user on API failure
    if (query.isError) setLoading(false);
    if (query.isPending) setLoading(true);
  }, [query.isSuccess, query.isError, query.isPending, isPublicRoute]);

  return query;
};
