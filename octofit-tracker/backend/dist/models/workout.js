import mongoose from 'mongoose';
const workoutSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner',
    },
    duration: { type: Number, required: true },
    createdAt: { type: Date, default: () => new Date() },
});
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
