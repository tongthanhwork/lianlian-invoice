import mongoose from 'mongoose';

const userReceiverSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const UserReceiver = mongoose.models.UserReceiver || mongoose.model('UserReceiver', userReceiverSchema); 