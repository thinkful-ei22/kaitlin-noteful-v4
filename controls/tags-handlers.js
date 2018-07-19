'use strict';

const mongoose = require('mongoose');

const Tag = require('../models/tag');
const Note = require('../models/note');

const getAllTagsHandler = (req, res, next) => {
  const userId = req.user.id;

  let filter = { userId };

  Tag.find(filter)
    .sort('name')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
};

const getTagByIdHandler = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Tag.findOne({ _id: id, userId })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { getAllTagsHandler, getTagByIdHandler };