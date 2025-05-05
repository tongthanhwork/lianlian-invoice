import mongoose from 'mongoose';

const userPayerAddressSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    address: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const UserPayerAddress = mongoose.models.UserPayerAddress || mongoose.model('UserPayerAddress', userPayerAddressSchema); 