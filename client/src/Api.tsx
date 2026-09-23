import axios from "axios";
import { BASE_URL } from "@/config"
import { toaster } from "@/components/ui/toaster";

type ApiErrorResponse = {
    message?: string;
    errCode?: string;
};

const url: string = `${BASE_URL}/v1`;

export const api = axios.create({
    baseURL: url,
    withCredentials: true
})

api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
        if (axios.isCancel(error)) return Promise.reject(error);

        if (axios.isAxiosError<ApiErrorResponse>(error)) {
            const backendError = error.response?.data;
            toaster.create({
                title: backendError?.message ?? "Unable to connect to the server",
                description: backendError?.errCode ?? "NETWORK_ERROR",
                type: "error",
            });
        } else {
            toaster.create({ title: "Something went wrong", type: "error" });
        }

        return Promise.reject(error);
    },
);
