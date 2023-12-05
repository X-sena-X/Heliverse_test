import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import teamRouter from "./routes/team.route";
import userRouter from "./routes/user.route";
import { checkEnvVariables } from "./utils/checks";

const requiredEnvVars = ["DATABASE_URL"];
const prisma = new PrismaClient();

const app = express();
const PORT = Number(process.env.PORT) || 8080;

app.use(morgan(process.env.NODE_ENV == "production" ? "common" : "dev"));
app.use(express.json());

app.use("/user", userRouter);
app.use("/team", teamRouter);
app.get("/", (req, res) => {
    res.send("Hey this is my API running 🥳");
});
const main = async () => {
    try {
        checkEnvVariables(requiredEnvVars);
        console.info(
            "🚧 Starting",
            process.env.NODE_ENV == "production" ? "production" : "development",
            "environment"
        );

        app.listen(PORT, "0.0.0.0", () => {
            console.info("🚀 App running on port", PORT);
        });
    } catch (e) {
        if (e instanceof Error) {
            console.error(`Error starting app: ${e.message}`);
            process.exit(1);
        }
    }
};

main().then(() => {
    process.on("SIGINT", () => {
        process.exit(0);
    });
});
