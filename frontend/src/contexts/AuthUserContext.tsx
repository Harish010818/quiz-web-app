import axios from "axios";
import { User } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  authUser: User | null;
  loading: boolean;
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
          { withCredentials: true },
        );

        if (res.data.success) {
           setAuthUser(res.data.user);
        }
      } catch (err) {
      } finally {
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};