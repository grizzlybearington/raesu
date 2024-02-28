import express from "express";
import * as NotesController from "../controllers/notes";

const router = express.Router();

router.get("/", NotesController.getNotes);

router.get("/:noteID", NotesController.getOneNote);

router.post("/", NotesController.postNote);

router.patch("/:noteID", NotesController.updateNote);

router.delete("/:noteID", NotesController.deleteNote);

export default router;
