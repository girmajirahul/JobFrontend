import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function ProtectedRoute({ children, allowedRoles }) {
 const {user}=useAuth()
  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ❌ Role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  // ✅ Allowed
  return children;
}