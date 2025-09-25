const express = require('express')
const router = express.Router();
const authMiddleWare = require('../MiddleWare/authMiddleware')

const {getContacts,addContact,deleteContact} = require('../Controller/contactController');

router.get("/read",authMiddleWare,getContacts);
router.post("/create",authMiddleWare,addContact);
router.delete("/:id",authMiddleWare,deleteContact);

module.exports = router;