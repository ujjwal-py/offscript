import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

function AdminProtected() {
    const user = useAuthStore((state) => state.user);

    if (user?.role !== "ADMIN") {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}

export default AdminProtected;
