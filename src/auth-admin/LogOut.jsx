import React, { useState, useEffect } from 'react';

export default function LogOut() {
  const [sessionToken, setSessionToken] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setSessionToken(token);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setSessionToken(undefined);
    window.location.reload();
  };
  // Function to handle logout, removes token from localStorage and reloads the page
  // This ensures that the user is logged out and the UI updates accordingly
  // The useEffect hook checks for the token in localStorage when the component mounts
  // If a token exists, it sets the sessionToken state to that value
  // If no token exists, sessionToken remains undefined
  // The component conditionally renders a logout button if sessionToken is defined
  // If sessionToken is undefined, it indicates the user is not logged in
  // The logout function is called when the user clicks the logout button
  
  return (
    <div>
      <p>Click the button below to log out.</p>
      
      {sessionToken ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>

  );
}