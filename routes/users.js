'use strict';

const express = require('express');

const createUserHandler = require('../controls/users-handlers');

const userRouter = express.Router();




/* ========== POST/CREATE AN ITEM ========== */

userRouter.post('/', createUserHandler);


module.exports = userRouter;