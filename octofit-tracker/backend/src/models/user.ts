import mongoose from 'mongoose';

export interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  role: 'athlete' | 'coach' | 'admin';
  joinedAt: Date;
}

const userSchema = new mongoose.Schema<UserDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['athlete', 'coach', 'admin'], default: 'athlete' },
  joinedAt: { type: Date, default: () => new Date() },
});

export const User = mongoose.models.User || mongoose.model<UserDoc>('User', userSchema);
