import Note from "../models/note.model.js";

class NoteRepository {

    async createNote( noteData ) {

        const note = await Note.create(noteData);
        return note;
    }

    async getAllNotes( user) {
        
        const notes = await Note.find( { user } );
        return notes;
    }
    
    async getNoteById (noteId) {
        const note = await Note.findById(noteId);
        return note;
    }

    async getNotesByTag (user, tag) {
        const notes = await Note.find( {
            user,
            tags: { $in: [tag]}});
        return notes;
    }

    async getArchivedNotes (user) {
        const archivedNotes = await Note.find( { user, isarchived: true});
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

    async searchNotes (user, query) {

        const notes = await Note.find( {
            user,
            $or: [
                {title: {$regex: query, $options: "i"}},
                {content: {$regex: query, $options: "i"}}
            ]
        });

        return notes;
    }
}

export default NoteRepository;