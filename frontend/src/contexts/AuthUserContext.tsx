import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
    username: string,
    email: string
}

const AuthContext = createContext<null | undefined>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/quiz/me`,
          { withCredentials: true }
        );
         
        setAuthUser(res.data);
      } catch (err) {
      } 
        finally {
        setLoading(false);
      }
    };

  fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
    {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);