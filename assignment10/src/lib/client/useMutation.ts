import axios from 'axios';
import { useState } from 'react';

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object | unknown;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T>(
  endpoint: string,
  method: 'POST' | 'PATCH' = 'POST'
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  async function mutationFn(data: object) {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await axios(endpoint, {
        method,
        data,
      });
      setState((prev) => ({ ...prev, data: response.data }));
    } catch (error: unknown) {
      setState((prev) => ({ ...prev, error: error }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }
  return [mutationFn, state];
}
