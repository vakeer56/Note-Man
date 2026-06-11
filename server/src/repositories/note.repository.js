import Note from "../models/note.model.js";

class NoteRepository {

    async createNote( noteData ) {

        const note = await Note.create(noteData);
        return note;
    }

    async getAllNotes( user) {
        const notes = await Note.find({ user, isArchived: false })
            .sort({ isPinned: -1, modifiedAt: -1 });
        return notes;
    }
    
    async getNoteById (noteId) {
        const note = await Note.findById(noteId);
        return note;
    }

    async getNotesByTag (user, tag) {
        const notes = await Note.find({
            user,
            isArchived: false,
            tags: { $in: [tag] },
        }).sort({ isPinned: -1, modifiedAt: -1 });
        return notes;
    }

    async getArchivedNotes (user) {
        const archivedNotes = await Note.find( { user, isArchived: true});
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
        const notes = await Note.find({
            user,
            isArchived: false,
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } },
            ],
        }).sort({ isPinned: -1, modifiedAt: -1 });
        return notes;
    }
}

export default NoteRepository;