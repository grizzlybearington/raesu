import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import NoteModel from "../models/note";
import { requireDefined } from "../util/requireDefined";

interface UpdateNoteParam {
    noteID: string,
}

interface NoteObject {
    title?: string,
    body?: string,
}

export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const curUserID = req.session.userID;
        requireDefined(curUserID);

        const notes = await NoteModel.find({userID: curUserID}).exec();
        res.status(200).json(notes);
    } catch (err) {
        next(err);
    }
};

export const getOneNote: RequestHandler = async (req, res, next) => {
    try {
        const curUserID = req.session.userID;
        requireDefined(curUserID);

        const noteID = req.params.noteID;
        if (!isValidObjectId(noteID)) {
            throw createHttpError(400, "Invalid note ID");
        }

        const note = await NoteModel.findById(noteID).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        if (!note.userID.equals(curUserID)) {
            throw createHttpError(401, "Unauthorized to access this note");
        }

        res.status(200).json(note);
    } catch (err) {
        next(err);
    }
};

export const postNote: RequestHandler<unknown, unknown, NoteObject, unknown>
= async (req, res, next) => {
    try {
        const title = req.body.title;
        const body = req.body.body;
        requireDefined(req.session.userID);

        if (!title) {
            throw createHttpError(400, "Note missing a title!");
        }

        const newNote = await NoteModel.create({
            userID: req.session.userID,
            title: title,
            body: body,
        });
        res.status(201).json(newNote);
    } catch (err) {
        next(err);
    }
};

export const updateNote:
RequestHandler<UpdateNoteParam, unknown, NoteObject, unknown>
= async (req, res, next) => {
    try {
        const noteID = req.params.noteID;
        const updTitle = req.body.title;
        const updText = req.body.body;

        requireDefined(req.session.userID);

        if (!isValidObjectId(noteID)) {
            throw createHttpError(400, "Invalid note ID");
        }
        if (!updTitle) {
            throw createHttpError(400, "Cannot update note without title");
        }

        const note = await NoteModel.findById(noteID).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        if (!note.userID.equals(req.session.userID)) {
            throw createHttpError(401, "Unauthorized to access this note");
        }

        note.title = updTitle;
        note.body = updText;

        const updatedNote = await note.save();
        res.status(200).json(updatedNote);

    } catch (err) {
        next(err);
    }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
    try {
        requireDefined(req.session.userID);
        const noteID = req.params.noteID;
        if (!isValidObjectId(noteID)) {
            /* TODO: Do we need an error for this? */
            throw createHttpError(400, "Invalid note ID");
        }

        const note = await NoteModel.findById(noteID).exec();

        if (!note) {
            /* TODO: Maybe change */
            throw createHttpError(404, "Note not found");
        }

        if (!note.userID.equals(req.session.userID)) {
            throw createHttpError(401, "Unauthorized to access this note");
        }

        await note.deleteOne();

        res.sendStatus(204);

    } catch (err) {
        next(err);
    }
};
