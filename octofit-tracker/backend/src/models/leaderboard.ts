import mongoose from 'mongoose';

export interface LeaderboardDoc extends mongoose.Document {
  scope: 'team' | 'user';
  refId: mongoose.Types.ObjectId;
  rank: number;
  totalDuration: number;
  totalCalories: number;
  createdAt: Date;
}

const leaderboardSchema = new mongoose.Schema<LeaderboardDoc>({
  scope: { type: String, enum: ['team', 'user'], required: true },
  refId: { type: mongoose.Schema.Types.ObjectId, required: true },
  rank: { type: Number, required: true },
  totalDuration: { type: Number, default: 0 },
  totalCalories: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => new Date() },
});

export const Leaderboard = mongoose.models.Leaderboard || mongoose.model<LeaderboardDoc>('Leaderboard', leaderboardSchema);
