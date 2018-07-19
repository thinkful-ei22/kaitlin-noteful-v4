'use strict';

const express = require('express');
const passport = require('passport');

const router = express.Router();

const { getAllNotesHandler, getNoteByIdHandler, createNoteHandler, updateNoteHandler, deleteNoteHandler } = require('../controls/note-handlers');

// PROTECT THE ENDPOINTS

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', getAllNotesHandler);

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/:id', getNoteByIdHandler);

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', createNoteHandler );

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', updateNoteHandler );

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', deleteNoteHandler );

module.exports = router;