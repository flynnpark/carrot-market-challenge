import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useMutation from '../lib/client/useMutation';
import { ResponseType } from '../lib/server/withHandler';

interface LoginForm {
  email: string;
}

type LoginResponse = ResponseType<null>;

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const [login, { loading, data }] = useMutation<LoginResponse>('/api/login');
  const router = useRouter();

  const onValid = (form: LoginForm) => {
    if (loading) return;
    login(form);
  };

  useEffect(() => {
    if (data?.success) {
      router.push('/');
    }
  }, [router, data]);

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            validate: (value) =>
              value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
                ? 'Invalid email address'
                : undefined,
          })}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
