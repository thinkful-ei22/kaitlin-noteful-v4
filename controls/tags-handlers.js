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

const createTagHandler = (req, res, next) => {
  let { name } = req.body;
  const userId = req.user.id;

  /***** Never trust users - validate input *****/

  if (name) {
    name = name.trim();
  }

  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const newTag = { name: name.trim(), userId };
  
  Tag.create(newTag)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('Tag name already exists');
        err.status = 400;
      }
      next(err);
    });
};

const updateTagHandler = (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = req.user.id;

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const updateTag = { name };

  Tag.findOneAndUpdate( { _id: id, userId }, updateTag, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('Tag name already exists');
        err.status = 400;
      }
      next(err);
    });
};

const deleteTagHandler = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  const tagRemovePromise = Tag.findOneAndRemove({ _id: id, userId });

  const noteUpdatePromise = Note.updateMany(
    { tags: id, },
    { $pull: { tags: id } }
  );

  Promise.all([tagRemovePromise, noteUpdatePromise])
    .then(() => {
      res.sendStatus(204).end();
    })
    .catch(err => {
      next(err);
    });

};

module.exports = { getAllTagsHandler, getTagByIdHandler, createTagHandler, updateTagHandler, deleteTagHandler };