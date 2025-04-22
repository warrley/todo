import express from 'express';
import { mainRouter } from './routes/main';
import { authRouter } from './routes/auth';
import dotenv from "dotenv"
import { todoRouter } from './routes/todos';
import cors from "cors"

const server = express();

dotenv.config();

server.use(cors());
server.use(express.json());

server.use("/", mainRouter);
server.use("/auth", authRouter);
server.use("/todos", todoRouter);

server.listen(process.env.PORT, () => {
    console.log(`server running in ${process.env.PORT}`);
})