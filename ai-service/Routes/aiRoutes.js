const express = require('express');
const router = express.Router();
const {generateEmail,subjectLines,personalizeEmail,suggestSendTime,runABTest} = require('../Controller/aiController');
const authMiddleware = require('../../backend/MiddleWare/authMiddleware');

router.post('/generate-email',generateEmail);
router.post('/subject-lines',subjectLines);
router.post('/personalize',personalizeEmail);
router.post('/suggest-send-time',authMiddleware,suggestSendTime);
router.post('/run-ab-test',runABTest);


module.exports = router;