const express = require('express');
const db = require('../models');

const router = express.Router();

const {signup,signin,logout} = require('../controller/authController') 

router.post('/signup',signup)
router.post('/login',signin)
router.get('/logout', logout);

module.exports = router;