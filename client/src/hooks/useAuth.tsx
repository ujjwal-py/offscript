import { useContext } from "react";
import { userContext } from "../context/AuthContext";

export function useAuth() {
    const context = useContext(userContext);
    if (!context) {
        throw new Error("context  is undefined");
    }
    return context;
}
