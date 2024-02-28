import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
//@ts-expect-error I should look into this
import bcrypt from "bcryptjs";

interface SignUpData {
    username?: string,
    password?: string,
}

/* TODO: Merge with above */
interface LoginData {
    username?: string,
    password?: string
}

export const signUp: RequestHandler<unknown, unknown, SignUpData, unknown>
= async (req, res, next) => {
    const username = req.body.username;
    const passwordPlain = req.body.password;

    try {
        if (!username || !passwordPlain) {
            throw createHttpError(400, "Bad or missing parameters");
        }

        const uniqueUsername = await UserModel.findOne({ username: username })
        .exec();

        if (uniqueUsername) {
            throw createHttpError(409,
                "Username already exists! Did you mean to login?");
        }

        const passwordHash = await bcrypt.hash(passwordPlain, 10);
        const newUser = await UserModel.create( {
            username: username,
            password: passwordHash
        });

        req.session.userID = newUser._id;

        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
};

export const logIn: RequestHandler<unknown, unknown, LoginData, unknown>
= async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            throw createHttpError(400, "Bad or missing parameters");
        }

        const user = await UserModel.findOne( { username: username } )
        .select("+password").exec();

        if (!user) {
            throw createHttpError(401, "Invalid login");
        }

        const cmpPassword = await bcrypt.compare(password, user.password);
        if (!cmpPassword) {
            throw createHttpError(401, "Invalid login");
        }

        req.session.userID = user._id;
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            next(err);
        } else {
            res.sendStatus(200);
        }
    });
};

export const retrieveUserDetails: RequestHandler = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.session.userID).exec();
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};
