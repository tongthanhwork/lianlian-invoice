import mongoose from 'mongoose';

const userReceiverEmailSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    email: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const UserReceiverEmail = mongoose.models.UserReceiverEmail || mongoose.model('UserReceiverEmail', userReceiverEmailSchema); 