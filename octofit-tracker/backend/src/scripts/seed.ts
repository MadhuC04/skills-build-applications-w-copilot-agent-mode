/*
Seed the octofit_db database with test data
*/

import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { Team } from '../models/team.js';
import { Workout } from '../models/workout.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(mongoUri);

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Workout.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  // Create users
  const users = await User.create([
    { name: 'Alice Rivera', email: 'alice@example.com', role: 'athlete' },
    { name: 'Ben Carter', email: 'ben@example.com', role: 'athlete' },
    { name: 'Cara Singh', email: 'cara@example.com', role: 'coach' },
    { name: 'Daniel Kim', email: 'daniel@example.com', role: 'athlete' },
    { name: 'Eve Johnson', email: 'eve@example.com', role: 'athlete' },
    { name: 'Frank Liu', email: 'frank@example.com', role: 'admin' },
  ]);

  // Create teams
  const teams = await Team.create([
    { name: 'Seahawks', description: 'Morning runners', members: [users[0]._id, users[1]._id] },
    { name: 'Red Dragons', description: 'Weekend warriors', members: [users[2]._id, users[3]._id, users[4]._id] },
  ]);

  // Create workouts
  const workouts = await Workout.create([
    { title: 'Quick HIIT', description: '20 min high intensity circuit', difficulty: 'intermediate', duration: 20 },
    { title: 'Endurance Run', description: '45 min steady run', difficulty: 'advanced', duration: 45 },
    { title: 'Recovery Yoga', description: '30 min gentle flow', difficulty: 'beginner', duration: 30 },
    { title: 'Strength Builder', description: '40 min strength session', difficulty: 'intermediate', duration: 40 },
  ]);

  // Create activities
  const now = Date.now();
  const activitiesData = [
    { user: users[0]._id, team: teams[0]._id, type: 'run', duration: 35, calories: 420, date: new Date(now - 1000 * 60 * 60 * 24 * 2) },
    { user: users[1]._id, team: teams[0]._id, type: 'cycle', duration: 60, calories: 700, date: new Date(now - 1000 * 60 * 60 * 24 * 5) },
    { user: users[2]._id, team: teams[1]._id, type: 'yoga', duration: 30, calories: 150, date: new Date(now - 1000 * 60 * 60 * 24 * 1) },
    { user: users[3]._id, team: teams[1]._id, type: 'run', duration: 50, calories: 600, date: new Date(now - 1000 * 60 * 60 * 24 * 3) },
    { user: users[4]._id, team: teams[1]._id, type: 'strength', duration: 40, calories: 500, date: new Date(now - 1000 * 60 * 60 * 24 * 4) },
    { user: users[0]._id, type: 'yoga', duration: 25, calories: 120, date: new Date(now - 1000 * 60 * 60 * 24 * 6) },
    { user: users[1]._id, type: 'run', duration: 30, calories: 380, date: new Date(now - 1000 * 60 * 60 * 24 * 7) },
    { user: users[3]._id, type: 'cycle', duration: 70, calories: 800, date: new Date(now - 1000 * 60 * 60 * 24 * 8) },
    { user: users[4]._id, type: 'run', duration: 20, calories: 240, date: new Date(now - 1000 * 60 * 60 * 24 * 2) },
    { user: users[2]._id, type: 'strength', duration: 45, calories: 550, date: new Date(now - 1000 * 60 * 60 * 24 * 10) },
  ];

  const activities = await Activity.create(activitiesData);

  // Compute and save leaderboard snapshots
  const teamAgg = await Activity.aggregate([
    { $match: { team: { $ne: null } } },
    { $group: { _id: '$team', totalDuration: { $sum: '$duration' }, totalCalories: { $sum: '$calories' }, sessions: { $sum: 1 } } },
    { $sort: { totalCalories: -1, totalDuration: -1 } },
  ]);

  const userAgg = await Activity.aggregate([
    { $group: { _id: '$user', totalDuration: { $sum: '$duration' }, totalCalories: { $sum: '$calories' }, sessions: { $sum: 1 } } },
    { $sort: { totalCalories: -1, totalDuration: -1 } },
  ]);

  const teamDocs = teamAgg.map((t: any, i: number) => ({ scope: 'team', refId: t._id, rank: i + 1, totalDuration: t.totalDuration, totalCalories: t.totalCalories }));
  const userDocs = userAgg.map((u: any, i: number) => ({ scope: 'user', refId: u._id, rank: i + 1, totalDuration: u.totalDuration, totalCalories: u.totalCalories }));

  await Leaderboard.create([...teamDocs, ...userDocs]);

  console.log('Seeding complete:');
  console.log(`  users: ${users.length}`);
  console.log(`  teams: ${teams.length}`);
  console.log(`  workouts: ${workouts.length}`);
  console.log(`  activities: ${activities.length}`);

  // Try to verify via API routes if server is running
  const apiBase = process.env.API_BASE ?? 'http://localhost:8000/api';
  try {
    // use global fetch if available
    const gf: any = (globalThis as any).fetch;
    if (typeof gf === 'function') {
      const respUsers = await gf(`${apiBase}/users`);
      const listUsers = await respUsers.json();
      console.log(`API /users returned ${Array.isArray(listUsers) ? listUsers.length : 'unknown'} items`);

      const respTeams = await gf(`${apiBase}/teams`);
      const listTeams = await respTeams.json();
      console.log(`API /teams returned ${Array.isArray(listTeams) ? listTeams.length : 'unknown'} items`);

      const respActivities = await gf(`${apiBase}/activities`);
      const listActivities = await respActivities.json();
      console.log(`API /activities returned ${Array.isArray(listActivities) ? listActivities.length : 'unknown'} items`);
    } else {
      console.log('Global fetch not available; skip API verification. Start the server and call /api endpoints to verify.');
    }
  } catch (err) {
    console.log('API verification skipped or failed (is the backend server running?):', (err as Error).message);
  }

  await mongoose.disconnect();
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
