import mongoose from 'mongoose';

export interface ActivityDoc extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  team?: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  calories: number;
  date: Date;
}

const activitySchema = new mongoose.Schema<ActivityDoc>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: () => new Date() },
});

export const Activity = mongoose.models.Activity || mongoose.model<ActivityDoc>('Activity', activitySchema);
