import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button onClick={() => loginWithRedirect()}>Log In with Google</button>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();
  return <button onClick={() => logout()}>Log Out</button>;
};

const Profile = () => {
  const { user } = useAuth0();
  console.log(user);

  return (
    <div>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <LoginButton />
      <LogoutButton />
    </div>
  );
};

export default Profile;
