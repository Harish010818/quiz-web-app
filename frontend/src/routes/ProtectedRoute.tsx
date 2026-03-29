import { useAuth } from "../contexts/AuthUserContext";
import { Redirect } from "wouter";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
const { authUser, loading } = useAuth();

if (loading) {
    return (
      <div className="h-screen flex justify-center bg-white items-center text-2xl text-black">
      Loading...
      </div>
    );
  }
 
return authUser ? children : <Redirect to="/" />; 
}

export default ProtectedRoute;