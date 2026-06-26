import express from 'express';
import { Activity } from '../models/activity.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';
const router = express.Router();
router.get('/users', async (_req, res) => {
    const users = await User.find().limit(100);
    res.json(users);
});
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
});
router.get('/teams', async (_req, res) => {
    const teams = await Team.find().populate('members').limit(100);
    res.json(teams);
});
router.post('/teams', async (req, res) => {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
});
router.get('/activities', async (_req, res) => {
    const activities = await Activity.find().populate('user team').limit(100);
    res.json(activities);
});
router.post('/activities', async (req, res) => {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
});
router.get('/workouts', async (_req, res) => {
    const workouts = await Workout.find().limit(100);
    res.json(workouts);
});
router.post('/workouts', async (req, res) => {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json(workout);
});
router.get('/leaderboard', async (_req, res) => {
    const teams = await Activity.aggregate([
        {
            $group: {
                _id: '$team',
                totalDuration: { $sum: '$duration' },
                totalCalories: { $sum: '$calories' },
                sessions: { $sum: 1 },
            },
        },
        { $sort: { totalCalories: -1, totalDuration: -1 } },
        { $limit: 10 },
        {
            $lookup: {
                from: Team.collection.name,
                localField: '_id',
                foreignField: '_id',
                as: 'team',
            },
        },
        { $unwind: { path: '$team', preserveNullAndEmptyArrays: true } },
    ]);
    const users = await Activity.aggregate([
        {
            $group: {
                _id: '$user',
                totalDuration: { $sum: '$duration' },
                totalCalories: { $sum: '$calories' },
                sessions: { $sum: 1 },
            },
        },
        { $sort: { totalCalories: -1, totalDuration: -1 } },
        { $limit: 10 },
        {
            $lookup: {
                from: User.collection.name,
                localField: '_id',
                foreignField: '_id',
                as: 'user',
            },
        },
        { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
    ]);
    res.json({ teams, users });
});
export default router;
