import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import { ResponseType } from '../../lib/server/withHandler';

type ProfileResponse = ResponseType<User>;

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>('/users/me');
  const router = useRouter();

  useEffect(() => {
    if (!data?.success) {
      router.push('/create-account');
    }
  }, [data, router]);

  return {
    user: data?.data,
    isLoading: !data && !error,
  };
}
