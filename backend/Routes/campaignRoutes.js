const express = require('express')
const router = express.Router();
const{updateCampaign,createCampaign,getCampaign,deleteCampaign,sendCampaign} = require('../Controller/campaignController');
const authMiddleware = require('../MiddleWare/authMiddleware');



router.post('/create', authMiddleware,createCampaign);
router.get('/read', authMiddleware,getCampaign);
router.put('/update/:id', authMiddleware,updateCampaign);
router.delete('/delete/:id', authMiddleware,deleteCampaign);
router.post('/send/:id',authMiddleware,sendCampaign);

module.exports = router;