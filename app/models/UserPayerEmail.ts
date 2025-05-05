import mongoose from 'mongoose';

const userPayerEmailSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    email: { type: String, required: true },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const UserPayerEmail = mongoose.models.UserPayerEmail || mongoose.model('UserPayerEmail', userPayerEmailSchema); 