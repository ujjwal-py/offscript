import "dotenv/config"


export const config = {
    jwt_secret: process.env.JWT_SECRET || "",
    node_env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    database_url: process.env.DATABASE_URL || "",
    frontend_url: process.env.FRONTEND_URL || "http://localhost:5173",
}