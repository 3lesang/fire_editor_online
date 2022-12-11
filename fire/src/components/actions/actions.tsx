import { useState } from 'react';
import styles from './actions.module.css';
import { useHistory, Link } from 'react-router-dom';
import { Media, Segment } from '../../model/types';
import { GoogleLogout } from 'react-google-login';
import instance from '../../api';
export default function Actions(props: {
  projectId: string;
  projectUser: string;
  mediaList: Media[];
  trackList: Segment[][];
  setProjectUser: (user: string) => void;
}) {
  const history = useHistory();

  const [loadStatus, setLoadStatus] = useState<string>('down');

  const saveProject = () => {
    setLoadStatus('loading');
    let data = {
      projectId: props.projectId,
      projectUser: props.projectUser,
      mediaList: props.mediaList,
      trackList: props.trackList,
    };
    instance.put('/saveProject', data).then((res) => {
      if (res.status === 200) {
        setLoadStatus('success');
        console.log(res.data.success);
      } else {
        setLoadStatus(res.data.error);
        console.log(res.data.error);
      }
    });
  };

  let color = 'rgb(51, 51, 51)';
  let message = 'saving your project...';

  if (loadStatus === 'loading') {
    color = 'rgb(51, 51, 51)';
    message = 'saving your project...';
  } else if (loadStatus === 'success') {
    color = 'rgb(0, 153, 51)';
    message = 'Project saved successfully!';
  } else {
    color = 'rgb(204, 0, 0)';
    message = loadStatus;
  }

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <div
          className={styles.popupContainer}
          style={{
            display: loadStatus === 'down' ? 'none' : 'block',
            backgroundColor: `${color}`,
          }}
        >
          <button
            className={styles.popupClose}
            onClick={() => {
              setLoadStatus('down');
            }}
          >
            <span className="material-icons">close</span>
          </button>
          {message}
        </div>
      </div>

      <Link to="/projects">
        <button className={styles.button}>
          <img
            className={styles.logo}
            src="/logo192.png"
          />
        </button>
      </Link>
      <GoogleLogout
        clientId="1010611727033-t5uiv067a9db9j900i9lnpqi3jncmtlt.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            className={styles.button}
            title="Logout"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <span className="material-icons">logout</span>
          </button>
        )}
        buttonText="Logout"
        onLogoutSuccess={() => {
          props.setProjectUser('');
          sessionStorage.removeItem('token');
          history.push('/');
        }}
      ></GoogleLogout>
      <Link to="/export">
        <button
          className={styles.button}
          title="Export"
        >
          <span className="material-icons">save_alt</span>
        </button>
      </Link>
      <button
        className={styles.button}
        title="Save"
        onClick={saveProject}
      >
        <span className="material-icons">save</span>
      </button>
      <button
        className={styles.button}
        onClick={() => history.push('/about')}
        title="About"
      >
        <span className="material-icons">help_outline</span>
      </button>
      <button className={styles.button}>
        <span className="material-icons">tonality</span>
      </button>
    </div>
  );
}
