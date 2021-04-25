import { Router } from 'express';
import bodyParser from 'body-parser';
import { format } from 'date-fns';

import User from '../models/user';

const router = Router();

const jsonParser = bodyParser.json();

// API

// Test route
router.get('/test', (req, res, next) => {
  console.log('test rout!');
  res.status(200).send('The flight is normal!');
});

// Check user
router.post('/user', jsonParser, (req, res, next) => {
  const { body: { robotID } } = req;

  if (!robotID) {
    const newUser = new User();
    newUser.setNewUser();

    return newUser.save()
      .then((user) => {
        return res.status(200).json({ user });
      })
      .catch(() => res.status(400));
  }

  User.findOneAndUpdate(
    { id: robotID },
    { $set: { lastVisit: new Date().toISOString() } },
    { returnOriginal: false },
    (error, user) => { // eslint-disable-line no-unused-vars

      if (error) return res.status(400);

      return res.status(200).json({ user });
    });
});

export default router;
