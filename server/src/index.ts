import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import v1 from "./routes/v1";
import "dotenv/config"
import cookieParser from 'cookie-parser';
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors"
import path from "path"



const port = process.env.PORT!;
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
})
app.use("/v1", v1);
app.use(errorHandler)

app.listen(port, () => {
    console.log("server is running on ", port)
});
