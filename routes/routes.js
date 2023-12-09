const express = require("express");
const router = express.Router();
const {generateId} = require('../controller/generate')

router.get('/GenerateId',generateId);
module.exports =router;