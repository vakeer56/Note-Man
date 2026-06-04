import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const userSchema = new mongoose.Schema( {

    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    firstName: {
        type: String,
        require: true,
    }, 
    lastName: {
        type: String,
    },
    provider: {
        type: String,
        default: "google"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = model('User', userSchema);
export default User;