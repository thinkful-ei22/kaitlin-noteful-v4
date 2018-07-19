'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Tag = require('../models/tag');
const Note = require('../models/note');

const router = express.Router();

const  { getAllTagsHandler, getTagByIdHandler, createTagHandler, updateTagHandler, deleteTagHandler } = require('../controls/tags-handlers');

// PROTECT THE ENDPOINTS

router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', getAllTagsHandler);

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/:id', getTagByIdHandler);

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', createTagHandler);

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', updateTagHandler);

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', deleteTagHandler);

module.exports = router;