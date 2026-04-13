import { useAuth } from "../contexts/AuthUserContext";
import { Redirect } from "wouter";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex flex-col gap-4 justify-center items-center bg-background">
        
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-muted" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
        </div>

        <p className="text-sm font-medium text-muted-foreground tracking-wide">
          Loading...
        </p>
      </div>
    );
  }

  return authUser ? children : <Redirect to="/" />;
};

export default ProtectedRoute;