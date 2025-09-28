const express = require('express');
const router = express.Router();
const {trackOpen,trackClick,getAnalytics} = require('../Controller/analyticsController');
const authMiddleware = require('../MiddleWare/authMiddleware');

router.get('/open/:campaignId',trackOpen);
router.get('/click/:campaignId',trackClick);

router.get('/read',authMiddleware,getAnalytics);
router.get("/read/:campaignId", authMiddleware, getAnalytics);

module.exports = router;