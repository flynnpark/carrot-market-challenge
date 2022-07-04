import { NextPage } from 'next';
import { useForm } from 'react-hook-form';

interface CreateAccountForm {
  name: string;
  email: string;
}

const CreateAccount: NextPage = () => {
  const { register, handleSubmit } = useForm<CreateAccountForm>();

  const onValid = (form: CreateAccountForm) => {
    console.log(form);
  };

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
