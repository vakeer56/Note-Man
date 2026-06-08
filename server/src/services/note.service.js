import NoteRepository from "../repositories/note.repository.js";

class NoteService {

    constructor() {
        this.noteRepository = new NoteRepository();
    } 

    async createNote(noteData) {

        if( !noteData) {
            throw new Error("Note data is required");
        }

        if( !noteData.title || noteData.title.trim() === "" ||  !noteData.userId || !noteData.content || noteData.content.trim() === "") {
            throw new Error("Required fields are missing");
        }


        const note = await this.noteRepository.createNote(noteData)
        return note;
    }

    async getAllNotes(userId) {

        if( !userId) {
            throw new Error("User ID is required");
        }

        const notes = await this.noteRepository.getAllNotes(userId);
        return notes;
    }

    async getNoteById( noteId ) {

        if( !noteId ) {
            throw new Error("Note ID is required");
        }

        const note = await this.noteRepository.getNoteById(noteId);
        return note;
    }

    async getNotesByTag(userId,  tag ) {

        if( !userId) {
            throw new Error("user ID is required");
        }

        if ( !tag ) {
            throw new Error("Tag is required");
        }

        const notes = await this.noteRepository.getNotesByTag(userId,tag);
        return notes;
    }

    async getArchivedNotes ( userId ) {

        if( !userId) {
            throw new Error("User ID is required");
        }

        const notes = await this.noteRepository.getArchivedNotes(userId);
        return notes;
        
    }

    async deleteNote ( noteId ) {

        if( !noteId ) {
            throw new Error("Note ID is required");
        }

        const note = await this.noteRepository.deleteNote(noteId);
        return note;

    }

    async updateNote (noteId, noteData) {

        if (!noteId) {
            throw new Error("Note ID is required");
        }

        if( !noteData) {
            throw new Error("Note Data is required");
        }

        return await this.noteRepository.updateNote(noteId, noteData);
    }

    async searchNotes (userId, query) {

        if( !userId) {
            throw new Error("User ID is required");
        }

        if( !query) {
            throw new Error("Query is required");
        }

        const notes = await this.noteRepository.searchNotes(userId, query);
        return notes;
    }


};

export default new NoteService();