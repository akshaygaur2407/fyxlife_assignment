import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Check if user is logged in (e.g., from localStorage or a token)
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the child component
  return children;
}

export default ProtectedRoute;
