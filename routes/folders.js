'use strict';

const express = require('express');
const passport = require('passport');


const router = express.Router();

const { getAllFoldersHandler, getFolderByIdHandler, createFolderHandler, updateFolderHandler, deleteFolderHandler } = require('../controls/folders-handlers');

// PROTECT THE ENDPOINTS

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', getAllFoldersHandler );

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/:id', getFolderByIdHandler);

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', createFolderHandler);

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', updateFolderHandler);

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', deleteFolderHandler);

module.exports = router;
