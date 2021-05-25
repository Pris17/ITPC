const express = require('express');
const router = express.Router();

router.use("/autosc",require('./autosc'));

module.exports = router;