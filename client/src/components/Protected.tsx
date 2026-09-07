import { useAuth } from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom';

function Protected() {
    const { user, loading } = useAuth();
    if (loading) {
        return <div>Loading wait</div>
    }
    if (!user) {
        return <Navigate to="/auth" replace />;
    }
    return <Outlet />

}

export default Protected