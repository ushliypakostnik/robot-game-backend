import { Router } from 'express';
import bodyParser from 'body-parser';
// import { format } from 'date-fns';

import User from '../models/user';

const router = Router();

const jsonParser = bodyParser.json();

// API

// Test route
router.get('/test', (req, res, next) => {
  console.log('test rout!');
  res.status(200).send('The flight is normal!');
});


// Set user
router.post('/user', jsonParser, (req, res) => {
  const { body: { robotID } } = req;

  // eslint-disable-next-line consistent-return
  User.findOne({ id: robotID }, (err, user) => {
    if (err) return res.status(400);

    if (!user) {
      const newUser = new User();
      newUser.setNewUser();

      return newUser.save()
        // eslint-disable-next-line no-shadow
        .then((user) => {
          return res.status(200).json({ user });
        })
        .catch(() => res.status(400));
    }

    User.findOneAndUpdate(
      { id: robotID },
      { $set: { lastVisit: new Date() } },
      { returnOriginal: false },
      // eslint-disable-next-line no-shadow
      (error, user) => {
        if (error) return res.status(400);

        return res.status(200).json({ user });
      });
  });
});

// Save user
router.post('/save', jsonParser, (req, res) => {
  const { body: { user } } = req;

  // eslint-disable-next-line consistent-return,no-shadow
  User.findOne({ id: user.robotID }, (err, storeUser) => {
    if (err) return res.status(400);

    if (!storeUser) {
      const newUser = new User();
      newUser.setNewUser();
      newUser.setUserData(user);

      return newUser.save()
        // eslint-disable-next-line no-shadow
        .then(() => res.status(200).json({ robotID: user.robotID }))
        .catch(() => res.status(400));
    }

    User.findOneAndUpdate(
      { id: user.robotID },
      {
        $set: {
          lastVisit: new Date(),

          level: user.level,
          levelFrom: user.levelFrom,

          health: user.health,
          endurance: user.endurance,
          ammo: user.ammo,
          weight: user.weight,

          red: user.red,
          orange: user.orange,
          green: user.green,
          purple: user.purple,

          passes: user.passes,

          directionX: user.directionX,
          directionY: user.directionY,
          directionZ: user.directionZ,
        }},
      { returnOriginal: false },
      // eslint-disable-next-line no-shadow
      (error) => {
        if (error) return res.status(400);

        return res.status(200).json({ robotID: user.robotID });
      });
  });
});

export default router;
