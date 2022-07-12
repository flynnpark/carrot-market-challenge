import useUser from '../lib/client/useUser';

const Header = () => {
  const { user } = useUser({ redirectTo: '/log-in' });
  return (
    <header>
      <h1>Twitter Clone</h1>
      {user ? <p>{user.name}</p> : <p>Loading...</p>}
    </header>
  );
};

export default Header;
