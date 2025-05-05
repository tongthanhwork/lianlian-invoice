import mongoose from 'mongoose';

const userPayerSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const UserPayer = mongoose.models.UserPayer || mongoose.model('UserPayer', userPayerSchema); 