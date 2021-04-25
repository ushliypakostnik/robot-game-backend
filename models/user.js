import mongoose from 'mongoose';
import crypto from 'crypto';

import config from '../config';

// User Model

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: { type: String, unique: true },
  firstVisit: { type: Date },
  lastVisit: { type: Date },

  level: { type: Number || null, default: null },
  levelFrom: { type: Number || null, default: null },

  health: { type: Number || null, default: null },
  endurance: { type: Number || null, default: null },
  ammo: { type: Number || null, default: null },
  weight: { type: Number || null, default: null },

  red: { type: Number || null, default: null },
  orange: { type: Number || null, default: null },
  green: { type: Number || null, default: null },
  purple: { type: Number || null, default: null },

  passes: { type: Array, default: [] },

  directionX: { type: Number || null, default: null },
  directionY: { type: Number || null, default: null },
  directionZ: { type: Number || null, default: null },
});

UserSchema.methods.setNewUser = function () {
  this.id = crypto.randomBytes(config.PASS.RANDOM_BYTES).toString('hex');
  this.firstVisit = new Date();
  this.lastVisit = this.firstVisit;
};

const User = mongoose.model('User', UserSchema);

export default User;
