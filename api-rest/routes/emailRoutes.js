const express = require("express");
const { handleContactForm, getContactData, handleRemember } = require("../controllers/emailController");
const router = express.Router();
const {
    contactValidation, 
    applyJobValidation,
  } = require("../validators/userValidation");

router.post("/submit", contactValidation, handleContactForm);
router.post("/job", applyJobValidation, handleContactForm);
router.post("/remember", handleRemember);
router.get("/data", getContactData);

module.exports = router;
