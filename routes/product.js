const router = require("express").Router();
const productController = require("../controller/productController");
const CommentController = require("../controller/CommentController");
const GmailData = require("../controller/GmailData");

router.post("/regi", productController.product_register);
router.get("/userdata", productController.product_userdata);
router.get("/Gmaildata", GmailData.Gmail_data);

router.get("/mail", GmailData.mail_get);

router.post("/forget", productController.product_forget);
router.post("/mailsent", GmailData.mail_sender);
router.post("/comment", CommentController.comment_data);
router.get("/commentdata", CommentController.comment_value);

// router.post("/gmaildata", GmailData.gmail_data);

module.exports = router;
