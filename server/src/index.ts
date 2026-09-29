import express, { Request, Response } from "express";
import v1 from "./routes/v1";
import "dotenv/config"
import cookieParser from 'cookie-parser';
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors"
import path from "path"
import { config } from "./config";

const port = config.port;
const app = express();

app.use(cors({
    origin: config.frontend_url,
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Hello, This is the api for offscript",
        copyright: "Ujjwal Kumar",
        github: "https://github.com/ujjwal-py",
        linkedin: "https://www.linkedin.com/in/ujjwalkr17/"
    });
})
app.use("/v1", v1);
app.use(errorHandler)

app.listen(port, () => {
    console.log("server is running on ", port)
});
