import React, { useState, useEffect } from 'react';

function FacebookLoginComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Initialize Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 'YOUR_FACEBOOK_APP_ID',  // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v12.0'
      });
    };
  }, []);

  const handleLogin = () => {
    window.FB.login((response) => {
      if (response.authResponse) {
        fetchFacebookProfile();
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile,email' });
  };

  const fetchFacebookProfile = () => {
    window.FB.api('/me', { fields: 'name,email' }, (profile) => {
      setUserName(profile.name);
      setIsLoggedIn(true);
      console.log('Facebook Profile:', profile);
    });
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          <button onClick={handleLogin}>Login with Facebook</button>
        </>
      ) : (
        <h2>Welcome {userName}</h2>
      )}
    </>
  );
}

export default FacebookLoginComponent;
