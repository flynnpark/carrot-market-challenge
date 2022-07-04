import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import { ResponseType } from '../../lib/server/withHandler';

type ProfileResponse = ResponseType<{ user: User }>;

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>('/api/users/me');
  const router = useRouter();

  useEffect(() => {
    if (data && !data.success) {
      router.push('/create-account');
    }
  }, [data, router]);

  return {
    user: data?.data?.user,
    isLoading: !data && !error,
  };
}
