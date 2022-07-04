import { NextPage } from 'next';
import { useForm } from 'react-hook-form';

interface LoginForm {
  email: string;
}

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm<LoginForm>();

  const onValid = (form: LoginForm) => {
    console.log(form);
  };

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
