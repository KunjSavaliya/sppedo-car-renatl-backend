const router = require("express").Router();
const productController = require('../controller/productController');
 const CommentController  = require('../controller/CommentController'); 



router.post("/regi",productController.product_register);
router.get("/userdata",productController.product_userdata);
router.get("/mail",productController.mail_get);

router.post("/forget",productController.product_forget);
router.post("/mailsent",productController.mail_sender);
router.post("/comment",CommentController.comment_data);






module.exports = router;