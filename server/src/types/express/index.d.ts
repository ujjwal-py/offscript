export interface AuthUser {
    user_id: string;
    role: "ADMIN" | "USER";
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}

export { };