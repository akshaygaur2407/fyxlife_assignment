import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    // If user is already logged in → redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // If not logged in → show the login page
  return children;
}

export default PublicRoute;
