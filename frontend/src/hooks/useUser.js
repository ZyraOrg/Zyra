import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import useAuthStore from '../store/useAuthStore';

const PUBLIC_ROUTES = ['/', '/login', '/signup', '/auth/callback'];

export const useUser = () => {
  const { setUser, setLoading } = useAuthStore();
  const { pathname } = useLocation();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

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
    if (query.isError) setUser(null);
    if (query.isPending) setLoading(true);
  }, [query.isSuccess, query.isError, query.isPending, isPublicRoute]);

  return query;
};
