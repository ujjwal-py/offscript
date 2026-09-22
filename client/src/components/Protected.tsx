import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { api } from '@/Api';

function Protected() {
    const { user, setUser } = useAuthStore();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Check if the user is authenticated
        const fetchUser = async () => {
            try {
                const response = await api.get('/me');
                if (response.status === 200) {
                    const userData = response.data;
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <div>Loading wait</div>
    }
    if (!loading && !user) {
        return <Navigate to="/auth" replace />;
    }
    return <Outlet />

}

export default Protected