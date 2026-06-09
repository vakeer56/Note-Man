import { 
    createNote,
    getAllNotes,
    getNoteById,
    getNotesByTag,
    getArchivedNotes,
    deleteNote,
    updateNote,
    searchNotes
} from "../controllers/note.controlller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

import express from 'express';
const router = express.Router();

router.post('/create',isAuthenticated, createNote);
router.get('/all',isAuthenticated,  getAllNotes);
router.get('/search',isAuthenticated,  searchNotes)
router.get('/tag/:tag',isAuthenticated,  getNotesByTag);
router.get('/getarchived',isAuthenticated,  getArchivedNotes);
router.get('/:noteId',isAuthenticated,  getNoteById);
router.delete('/delete/:noteId',isAuthenticated, deleteNote );
router.patch('/update/:noteId',isAuthenticated,  updateNote);

export default router;