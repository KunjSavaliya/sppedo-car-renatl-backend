const router = require("express").Router();
const RegisterController = require("../controller/RegisterController");
const ContactController = require("../controller/ContactController");
const CarbookingController = require("../controller/CarbookingController");
const FeedbackController = require("../controller/FeedbackController");

router.post("/regi", RegisterController.product_register);
router.get("/userdata", RegisterController.product_userdata);
router.get("/Gmaildata", CarbookingController.Gmail_data);

router.get("/mail", CarbookingController.mail_get);

router.post("/forget", RegisterController.product_forget);
router.post("/mailsent", CarbookingController.mail_sender);
router.get("/Gmailupdateid/:id", CarbookingController.Gmail_updateid);
router.delete("/Gdelete/:id", CarbookingController.Gmail_del);
router.put("/gupdate/:id", CarbookingController.Gmail_update);

router.post("/comment", ContactController.comment_data);
router.get("/commentdata", ContactController.comment_value);

router.post("/feedback", FeedbackController.Feedback_sender);
router.get("/feedbackdata", FeedbackController.feedback_data);

module.exports = router;
