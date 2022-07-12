import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

interface UserInfoResponse {
  success: boolean;
  result: User;
}

function useUser({ redirectTo = '', redirectIfFound = false }) {
  const { data, mutate: mutateUser } =
    useSWR<UserInfoResponse>('/api/users/me');
  const router = useRouter();

  useEffect(() => {
    if (!redirectTo || !data) return;
    if (
      (redirectTo && !redirectIfFound && !data?.result) ||
      (redirectIfFound && data?.result)
    ) {
      router.replace(redirectTo);
    }
  }, [data, redirectIfFound, redirectTo, router]);

  return { user: data?.result, mutateUser };
}

export default useUser;
