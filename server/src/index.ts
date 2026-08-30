import express, { Request, Response } from "express";
import v1 from "./routes/v1";
import "dotenv/config"
import cookieParser from 'cookie-parser';



const port = process.env.PORT!;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
})
app.use("/v1", v1);

app.listen(port, () => {
    console.log("server is running on ", port)
});