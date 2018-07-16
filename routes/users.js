'use strict';

const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/user');

const userRouter = express.Router();


/* ========== POST/CREATE AN ITEM ========== */

userRouter.post('/', (req, res, next) => {
  const { username, password, fullname } = req.body;

  /***** Never trust users - validate input *****/

  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if(missingField) {
    const err = new Error(`Missing '${missingField}' in request body`);
    err.status = 422;
    return next(err);
  }

  const stringFields = ['username', 'password', 'fullname'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }

  // let newUser = { username, password, fullname };

  return User.hashPassword(password)
    .then(digest => {
      const newUser = {
        username,
        password: digest,
        fullname
      };
      return User.create(newUser);
    })
    .then (result => {
      return res.status(201).location(`${req.originalUrl}/${result.id}`).json(result);
    })
    .catch(err => {
      if(err.code === 1000) {
        err = new Error('The username already exists');
        err.status = 400;
      }
      next(err);
    });
});

module.exports = userRouter;