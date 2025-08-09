const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/users', adminController.getAllUsers);
router.post('/verify/:id', adminController.verifyUser);
router.post('/block/:id', adminController.blockUser);
  
module.exports = router;
