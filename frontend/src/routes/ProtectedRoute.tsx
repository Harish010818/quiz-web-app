import { useAuth } from "../contexts/AuthUserContext";
import { Redirect } from "wouter"; 

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
const { authUser, loading } = useAuth();

console.log(loading);
     
  if (loading) {
    return (
      <div className="h-screen flex justify-center bg-white items-center text-2xl text-black">
      Loading...
      </div>
    );
  }

console.log(authUser);  

return authUser ? children : <Redirect to="/" />; 
}

export default ProtectedRoute;