'use strict';

const passport = require('passport');
const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');

const options = {session: false, failWithError: true};

const localAuth = passport.authenticate('local', options);

function createAuthToken (user) {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}

authRouter.post('/login', localAuth, function (req, res) {
  const authToken = createAuthToken(req.user);
  res.json(authToken);
});

module.exports = authRouter;