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

import express from 'express';
const router = express.Router();

router.post('/create', createNote);
router.get('/all', getAllNotes);
router.get('/search', searchNotes)
router.get('/tag/:tag', getNotesByTag);
router.get('/getarchived', getArchivedNotes);
router.get('/:noteId', getNoteById);
router.delete('/delete/:noteId',deleteNote );
router.patch('/update/:noteId', updateNote);

export default router;