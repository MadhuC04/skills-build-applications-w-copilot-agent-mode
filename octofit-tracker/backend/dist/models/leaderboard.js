import mongoose from 'mongoose';
const leaderboardSchema = new mongoose.Schema({
    scope: { type: String, enum: ['team', 'user'], required: true },
    refId: { type: mongoose.Schema.Types.ObjectId, required: true },
    rank: { type: Number, required: true },
    totalDuration: { type: Number, default: 0 },
    totalCalories: { type: Number, default: 0 },
    createdAt: { type: Date, default: () => new Date() },
});
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
