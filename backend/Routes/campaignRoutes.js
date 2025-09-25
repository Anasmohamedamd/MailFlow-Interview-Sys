const express = require('express')
const router = express.Router();
const{updateCampaign,createCampaign,getCampaign,deleteCampaign} = require('../Controller/campaignController');
const authMiddleware = require('../MiddleWare/authMiddleware');



router.post('/create', authMiddleware,createCampaign);
router.get('/read', authMiddleware,getCampaign);
router.put('/update/:id', authMiddleware,updateCampaign);
router.delete('/delete/:id', authMiddleware,deleteCampaign);

module.exports = router;