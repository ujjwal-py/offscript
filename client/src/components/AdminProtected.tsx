import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { toaster } from "./ui/toaster";

function AdminProtected() {
    const user = useAuthStore((state) => state.user);

    if (user?.role !== "ADMIN") {
        toaster.create({
            title: "You don't have enough rights",
            description: "FORBIDDEN_CONTENT",
            type: "error"
        })
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}

export default AdminProtected;
