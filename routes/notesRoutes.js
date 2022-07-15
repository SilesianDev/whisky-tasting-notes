import express from "express";
const router = express.Router();

import {
  getAllNotes,
  getSingleNote,
  addNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";

import isAuth from "../middleware/is-auth.js";

router.get("/", getAllNotes);
router.get("/:id", getSingleNote);
router.post("/", isAuth, addNote);
router.patch("/:id", isAuth, updateNote);
router.delete("/:id", isAuth, deleteNote);

export default router;
