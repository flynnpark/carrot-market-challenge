import { useState } from 'react';

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object | unknown;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T>(
  endpoint: string,
  method: 'POST' | 'PATCH' | 'PUT' | 'DELETE' = 'POST'
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  async function mutation(data: object) {
    setState({ loading: true });
    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setState({ loading: false, data: json });
    } catch (error: unknown) {
      setState((prev) => ({ ...prev, error: error }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }

  return [mutation, state];
}
