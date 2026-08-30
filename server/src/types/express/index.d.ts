export interface AuthUser {
    user_id: string;
    // whatever you actually put in the JWT payload
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}

export { };