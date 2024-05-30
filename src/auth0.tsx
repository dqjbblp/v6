import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState, Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = (props:{ children:ReactNode }) => {
  const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;

  const nav = useNavigate()

  const onRedirectCallback = (appState:AppState|undefined) => {
    nav(appState?.returnTo || window.location.pathname); 
  };
  

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{redirect_uri:window.location.origin}}
      onRedirectCallback={()=>onRedirectCallback({
        returnTo:'/profile'
      })}
    >
      {props.children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;