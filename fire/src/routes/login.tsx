import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import instance from '../api';

export default function Login(props: {
  projectUser: string;
  setProjectUser: (user: string) => void;
}) {
  const unsuccessfulLogin = (response: any) => {
    console.log(response);
    console.log('Login process terminated');
  };

  const handleLogin = (response: any) => {
    sessionStorage.setItem('token', response.tokenId);
    instance.get('/getEmail').then((res) => {
      props.setProjectUser(res.data.email);
    });
  };
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          '1010611727033-t5uiv067a9db9j900i9lnpqi3jncmtlt.apps.googleusercontent.com',
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  });
  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles.login}>
        <div className={styles.loginBox}>
          <Link to="/">
            <img
              className={styles.logo}
              src="/logo192.png"
            />
          </Link>
          <GoogleLogin
            clientId="1010611727033-t5uiv067a9db9j900i9lnpqi3jncmtlt.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                className={styles.button}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                title="Sign in with Google"
              >
                <img
                  className={styles.google}
                  src="/google.svg"
                />
                Sign in with Google
              </button>
            )}
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={unsuccessfulLogin}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    </div>
  );
}
