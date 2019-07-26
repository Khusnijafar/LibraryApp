const express = require('express');
const libraryController = require('./../controllers/libraryController');
const authController = require('./../controllers/authController');

const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route('/')
  .get( libraryController.getAllLibrary)
  .post(authController.protect, authController.restrictTo('admin'),libraryController.createLibrary);

router
  .route('/:id')
  .get(libraryController.getLibrary)
  .patch(libraryController.updateLibrary)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    libraryController.deleteLibrary
  );

module.exports = router;
