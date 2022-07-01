import { useState } from 'react';
import { useForm } from 'react-hook-form';

type LoginForm = {
  name: string;
  email: string;
  password: string;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [loggedIn, setLoggedIn] = useState(false);

  const onValid = (form: LoginForm) => {
    setLoggedIn(true);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Please write down your name.' })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="text"
          placeholder="Only @naver.com"
          {...register('email', {
            required: 'Please write down your email',
            validate: (value) =>
              value.endsWith('@naver.com') || 'Only @naver email allowed.',
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          placeholder="Min 10 characters"
          {...register('password', {
            required: 'Please write down your password',
            minLength: {
              value: 10,
              message: 'Password has to be more than 10 characters.',
            },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="submit">Log in</button>
      {loggedIn && <p>Thank you</p>}
    </form>
  );
}

export default App;
