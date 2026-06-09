import mongoose from 'mongoose';

import {Schema, model} from 'mongoose';

const noteSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    content: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: []
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    isPinned: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    }
} );


const Note = model("Note", noteSchema);
export default Note;