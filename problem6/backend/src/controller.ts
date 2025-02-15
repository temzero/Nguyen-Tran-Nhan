import { Request, Response } from "express";
import UserModel from "./userSchema";
const jwt = require('jsonwebtoken');

const usersData = [
  { username: 'user-A', score: 100 },
  { username: 'user-B', score: 200 },
  { username: 'user-C', score: 300 },
  { username: 'user-D', score: 400 },
  { username: 'user-E', score: 500 },
  { username: 'user-F', score: 600 },
  { username: 'user-G', score: 700 },
  { username: 'user-H', score: 800 },
  { username: 'user-L', score: 900 },
  { username: 'user-M', score: 1001 }
];

const Controllers = {
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (password !== 'password') {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Create and assign token
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    return res.status(200).json({ token });
  },

  getLeaderboard: async (req: Request, res: Response) => {     
    try {
        const users = await UserModel.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
  },

  updateUserScore: async (req: Request, res: Response) => {
    try {
      const { username, score, type } = req.body;

      if (!username || !score || !type) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      if (score < 0) {
        return res.status(400).json({ error: "Invalid score value" });
      }

      const user = await UserModel.findOne({username});
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      let updatedScore = user.score;

      if (type === 'increase' || type === '') {
        updatedScore = user.score + score;
      } else if (type === 'decrease') {
        updatedScore = Math.max(0, user.score - score);
      } else {
        return res.status(400).json({ error: "Invalid type, must be 'increase' or 'decrease'" });
      }

      const updatedUser = await UserModel.findOneAndUpdate(
        {username},
        {score: updatedScore},
        {new: true}
      );
      console.log('Updated User:', updatedUser);
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default Controllers;
