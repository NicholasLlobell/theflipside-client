import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {UserContext} from "./UserContext";
import { API_URL } from "./services/API_URL";

export default function Header() {
  const {setUserInfo,userInfo, removeToken} = useContext(UserContext);
  const navigate = useNavigate()
  useEffect(() => {
    let token = localStorage.getItem('authToken')
    // userInfo &&
    fetch(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {

    setUserInfo(null);
    removeToken()
    navigate('/')
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">The Flip Side 🐬</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create Flip</Link>
            <a>Trending</a>
            <a>Discover</a>
            <a>Profile</a>
            <a onClick={logout}>Logout({username}🐬)</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}