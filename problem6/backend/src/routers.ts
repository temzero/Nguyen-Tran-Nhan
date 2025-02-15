
const express = require('express');
const router = express.Router();
import Controllers from "./controller";

router.post('/login', Controllers.login);
router.get('/api/score/leaderboard', Controllers.getLeaderboard);
router.put('/api/user/score/update', Controllers.updateUserScore);



export default router;
