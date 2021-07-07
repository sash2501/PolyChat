import React, { useContext, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import {auth} from '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if(user) history.push('./teams');
    })
  }, [user, history]);

  const uservalue ={ user };

  return (
    <AuthContext.Provider value={uservalue}>
      {!loading && children}
    </AuthContext.Provider>
  )
}