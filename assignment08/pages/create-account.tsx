import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useMutation from '../lib/client/useMutation';
import { ResponseType } from '../lib/server/withHandler';

interface CreateAccountForm {
  name: string;
  email: string;
}

type CreateAccountResponse = ResponseType<null>;

const CreateAccount: NextPage = () => {
  const { register, handleSubmit } = useForm<CreateAccountForm>();
  const [createAccount, { loading, data }] =
    useMutation<CreateAccountResponse>('/api/signup');
  const router = useRouter();

  const onValid = (form: CreateAccountForm) => {
    if (loading) return;
    createAccount(form);
  };

  useEffect(() => {
    if (data?.success) {
      router.push('/log-in');
    }
  }, [router, data]);

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters',
            },
            maxLength: {
              value: 20,
              message: 'Name must be at most 20 characters',
            },
          })}
        />
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
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
