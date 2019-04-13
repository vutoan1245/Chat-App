const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({"name": "Post test"}));

module.exports = router;