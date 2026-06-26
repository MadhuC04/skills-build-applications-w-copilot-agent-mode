import mongoose from 'mongoose';

export interface WorkoutDoc extends mongoose.Document {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  createdAt: Date;
}

const workoutSchema = new mongoose.Schema<WorkoutDoc>({
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

export const Workout = mongoose.models.Workout || mongoose.model<WorkoutDoc>('Workout', workoutSchema);
