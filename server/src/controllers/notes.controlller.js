import noteService from "../services/note.service";


export const createNote = async (req, res) => {

    try {

        const note = await noteService.createNote(req.body);

        return res.status(201).json( {
            success: true,
            data: note,
            message: "note created successfully"
        });
    } catch( err ) {
        res. status(400).json( {
            success: false,
            message: err.message
        });
    }
};

export const getAllNotes = async (req, res) => {

    try {

        const notes = await noteService.getAllNotes(req.user._id);

        return res.status(200).json({
            success: true,
            data: notes,
            message: "notes fetched successfully"
    }) 
    } catch( err ) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
};

export const getNoteById = async (req, res) => {

    try {
        const note = await noteService.getNoteById(req.user._id);

        return res.status(200).json( {
            success: true,
            data: note,
            message: "note fetched successfully"
        })
    } catch( err ) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export const getNotesByTag = async (req, res) => {

    try {

        const notes = await noteService.getNotesByTag(
            req.user._id,
            req.params.tag
        );

        res.status(200).json({
            success: true,
            data: notes,
            message: "notes fetched successfully"
        });
    } catch( err ) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }

}

export const getArchivedNotes = async (req, res) => {

    try {
        const notes = await noteService.getArchivedNotes(req.user._id);

        return res.status(200).json({
            success: true,
            data: notes,
            message: "fetched notes successfully"
        })
    } catch( err ) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }

}

export const deleteNote = async (req, res) => {

    try {
        const note = await noteService.deleteNote(req.params.noteId);

        return res.status(200).json({
            success: true,
            data: note,
            message: "deleted notes successfully"
        })
    } catch(err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export const updateNote = async (req, res) => {

    try {
        const note = await noteService.updateNote(
            req.params.noteId,
            req.body
        )

        return res.status(200).json({
            success: true,
            data: note,
            message: "updated notes successfully"
        })

        
    } catch(err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export const searchNotes = async (req, res) => {
    try {

        const notes = await noteService.searchNotes(
            req.user._id, 
            req.query.q
        );

        return res.status(200).json({
            success: true,
            message: "Notes found successfully",
            data: notes
        });

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};