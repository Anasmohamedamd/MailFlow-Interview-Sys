const express = require('express');
const router = express.Router();
const authMiddleware = require('../MiddleWare/authMiddleware');
const {generateEmail,subjectLines,personalizeEmail,suggestSendTime,runABTest} = require('../Controller/aiController');

// Public AI routes
router.post('/generate-email', generateEmail);
router.post('/subject-lines', subjectLines);
router.post('/personalize', personalizeEmail);
router.post('/run-ab-test', runABTest);

// Protected AI route: suggest send time
router.post('/suggest-send-time', authMiddleware, suggestSendTime);

module.exports = router;
