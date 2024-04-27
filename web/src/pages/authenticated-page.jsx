import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

function AuthenticatedPage({ children }) {
  const { user } = useAuth();

  // loading
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  // not logged
  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AuthenticatedPage;
