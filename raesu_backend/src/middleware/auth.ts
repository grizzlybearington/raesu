import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const validateAuth: RequestHandler = (req, res, next) => {
    if (req.session.userID) {
        next();
    } else {
        next(createHttpError(401, "User not authenticated"));
    }
}
