import Note from "../models/note.model.js";

class NoteRepository {

    async createNote( noteData ) {

        const note = await Note.create(noteData);
        return note;
    }

    async getAllNotes( userId) {
        
        const notes = await Note.find( { userId } );
        return notes;
    }
    
    async getNoteById (noteId) {
        const note = await Note.findById(noteId);
        return note;
    }

    async getNotesByTag (userId, tag) {
        const notes = await Note.find( {
            userId,
            tags: { $in: [tag]}});
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

    async searchNotes (userId, query) {

        const notes = await Note.find( {
            userId,
            $or: [
                {title: {$regex: query, $options: "i"}},
                {content: {$regex: query, $options: "i"}}
            ]
        });

        return notes;
    }
}

export default NoteRepository;