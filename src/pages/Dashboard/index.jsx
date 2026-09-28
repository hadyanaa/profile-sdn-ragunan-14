import { Navigate } from 'react-router-dom';

export default function DashboardIndex() {
  return <Navigate to="/dashboard/overview" replace />;
}
