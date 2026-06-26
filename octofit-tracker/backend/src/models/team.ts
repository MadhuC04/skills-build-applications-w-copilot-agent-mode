import mongoose from 'mongoose';

export interface TeamDoc extends mongoose.Document {
  name: string;
  description?: string;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new mongoose.Schema<TeamDoc>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() },
});

export const Team = mongoose.models.Team || mongoose.model<TeamDoc>('Team', teamSchema);
