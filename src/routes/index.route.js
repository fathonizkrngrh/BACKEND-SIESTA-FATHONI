const express = require("express");
const router = express.Router();
const phoneNumberController = require("../controllers/phoneNumber.controller");

router.get("/formatPhoneNumber", phoneNumberController.reformat);

module.exports = router;
