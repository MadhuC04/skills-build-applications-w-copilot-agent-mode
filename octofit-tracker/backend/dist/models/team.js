import mongoose from 'mongoose';
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: () => new Date() },
});
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
