const router = require("express").Router();
const commentCtrl = require("../controllers/comment.controller");
const authentication = require("../middleware/tokenAuth");



router.post("/:postID", authentication, commentCtrl.createComment);
router.get("/:userID/:page", authentication, commentCtrl.getAllMyComments);
router.put("/:commentID", authentication, commentCtrl.updateComment);


//  **admin only**
router.put("/status/:commentID", authentication, commentCtrl.unpublishComment);


//  ******
router.delete("/:commentID", authentication, commentCtrl.deleteComment);
router.delete("/user/:userID", authentication, commentCtrl.deleteAllMyComments);



module.exports = router;