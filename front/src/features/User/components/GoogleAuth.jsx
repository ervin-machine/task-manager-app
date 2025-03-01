import React from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

function GoogleAuth({ googleAuth }) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  
  return (
    <GoogleOAuthProvider clientId={clientId}>
     <GoogleLogin
       onSuccess={credentialResponse => {
         googleAuth(credentialResponse.credential)
       }}
       onError={() => {
       }}
     />
   </GoogleOAuthProvider>
  )
}

export default GoogleAuth