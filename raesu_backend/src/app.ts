import MongoStore from "connect-mongo";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import { validateAuth } from "./middleware/auth";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import env from "./util/validateEnv";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(session({
    secret: env.SESSION_KEY,
    store: MongoStore.create({
        mongoUrl: env.MONGODB_CONNECTION_STRING
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, /* In ms */
    },
    saveUninitialized: false,
    rolling: true,
    resave: false,
}));

app.use("/api/notes", validateAuth, notesRoutes);

app.use("/api/users", userRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    let errMessage = "An unknown error occurred";
    let HTTPCode = 500;
    if (isHttpError(err)) {
        HTTPCode = err.status;
        errMessage = err.message;
    }
    res.status(HTTPCode).json({ err: errMessage })
});

export default app;
