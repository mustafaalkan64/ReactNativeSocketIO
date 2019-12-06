const router = require('express').Router();


// Users routes

router.use('/users', require('@routes/userRoutes'));


module.exports = router;