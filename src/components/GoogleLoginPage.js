import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginPage = ({ onLoginSuccess }) => {
  const responseGoogle = (response) => {
    if (response.error) {
      console.error("Échec de la connexion Google:", response.error);
    } else {
      console.log(response);
      onLoginSuccess(response);
    }
  };

  return (
    <div className="">
      <div className="">
        <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
          <GoogleLogin
            render={(renderProps) => (
              <button
                type="button"
                className=""
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="" /> Sign in with google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default GoogleLoginPage;
