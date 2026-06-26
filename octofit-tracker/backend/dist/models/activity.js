import mongoose from 'mongoose';
const activitySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, default: () => new Date() },
});
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
