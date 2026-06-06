import Note from "../models/note.model.js";

class NoteRepository {

    async createNote( noteData ) {

        const note = await Note.create(noteData);
        return note;
    }

    async getAllNote( userId) {
        
        const notes = await Note.find( userId );
        return notes;
    }
    
    async getNotebyId (noteId) {
        const note = await Note.findById(noteId);
        return note;
    }

    async getNotesByTag (tag) {
        const notes = await Note.find( {tags: { $in: [tag]}});
        return notes;
    }

    async getArchivedNotes (userId) {
        const archivedNotes = await Note.find( { userId, archived: true});
        return archivedNotes;
    }
    
    async deleteNote (noteId) {

        const deletedNote = await Note.findByIdAndDelete(noteId);
        return deletedNote;
    }

    async updateNote (noteId, noteData) {
        
        const updatedNote = await Note.findByIdAndUpdate(noteId, noteData, {new: true});
        return updatedNote;
    }
}