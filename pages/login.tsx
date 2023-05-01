import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import React, { useEffect } from 'react';

import styles from '../styles/button.module.css';
import { useRouter } from 'next/router';

const scopes = ['user:email', 'read:user'];

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query;

    if (code) {
      console.log(`Received authorization code: ${code}`);

      fetch(`http://localhost:5000/api/auth/github/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // credentials: 'include' necessary for sending refresh-token if exists
        credentials: 'include',
        body: JSON.stringify({
          code,
        }),
      })
        .then((response) => {
          if (response.status === 202) {
            console.log('Modal Window appears here...');
            return;
          }

          if (response.ok) {
            return response.json();
          }

          throw new Error('Bad response');
        })
        .then((data) => console.log(data?.accessToken))
        .catch(console.error);
    }
  }, [router.query]);

  const handleRequest = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=2d1c77066e1a9ff2584b&scope=${scopes.join(
      ' '
    )}`;
  };

  return (
    <button className={styles.button} onClick={handleRequest}>
      <FontAwesomeIcon icon={faGithub} />
      <span>Sign in with GitHub</span>
    </button>
  );
};

export default LoginPage;
