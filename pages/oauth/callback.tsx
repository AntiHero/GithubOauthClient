import { useRouter } from 'next/router';
import { useEffect } from 'react';

function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query);
    const { code, state } = router.query;

    console.log(`Received authorization code: ${code}`);

    fetch(`http://localhost:5000?code=${code}`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }

        throw new Error('Bad response');
      })
      .then(console.log)
      .catch(console.error);
  }, [router.query]);

  return (
    <div>
      <h1>OAuth Callback</h1>
      <p>Retrieving authorization code...</p>
    </div>
  );
}

export default OAuthCallback;
