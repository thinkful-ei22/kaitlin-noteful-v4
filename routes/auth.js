'use strict';

const passport = require('passport');
const express = require('express');
const authRouter = express.Router();

const options = {session: false, failWithError: true};

const localAuth = passport.authenticate('local', options);

authRouter.post('/login', localAuth, function (req, res) {
  return res.json(req.user);
});

module.exports = authRouter;