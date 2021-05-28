const express = require('express');
const db = require('../models');

const router = express.Router();

const
{getDashboard,addCategory,addSubCategory,deleteCategory} = require("../controller/dashboardController")

router.get('/dashboard',  getDashboard);
router.post('/addCategory/:userId',addCategory)
router.post('/addSubCategory/:categoryId',addSubCategory)
router.get('/deleteCategory/:categoryId',deleteCategory)
module.exports = router;