import React, { useState, useEffect } from 'react';
import '@/assets/LogOut.css';


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

  return (
    <div className="logout-container">   
      {sessionToken ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>

  );
}