import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from 'axios'
import { API_URL } from "../services/API_URL";
export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo, storeToken } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    console.log('hello')
    const response = await axios.post(`${API_URL}/login`, { username, password });
    console.log("this is the login response", response)
    if (response.status !== 200) {
      alert('NARC SHARK 🦈 TRY AGAIN');
      return
    }
    setUserInfo(response.data.user)
    storeToken(response.data.authToken)
    setRedirect(true)
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form className="login" onSubmit={login}>
      <h1>Loch Login 🐬</h1>
      <input type="text"
        placeholder="Username"
        //  value={username}
        onChange={ev => setUsername(ev.target.value)} />
      <input type="password"
        placeholder="Password"
        //  value={password}
        onChange={ev => setPassword(ev.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}