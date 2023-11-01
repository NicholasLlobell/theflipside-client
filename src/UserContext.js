import {createContext, useState} from "react";

const UserContext = createContext();

function UserContextProvider({children}) {
  const [userInfo,setUserInfo] = useState(null);
  const storeToken = (token) => {
    localStorage.setItem('authToken', token)
  }
  const removeToken = () => {
    localStorage.clear()
  }
  return (
    <UserContext.Provider value={{userInfo,setUserInfo, storeToken, removeToken}}>
      {children}
    </UserContext.Provider>
  );
}
export {UserContext, UserContextProvider};