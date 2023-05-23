const express = require('express');
const bookRoutes = require('./bookRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

// Mount sub-routers
router.use('/', bookRoutes);
router.use('/', authRoutes);

module.exports = router;