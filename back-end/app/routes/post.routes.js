const router = require("express").Router();
const postCtrl = require("../controllers/post.controller");
const authentication = require("../middleware/tokenAuth");
const multer = require("../middleware/multer-config_image");



router.post("/", authentication, multer, postCtrl.createPost);
router.get("/all", authentication, postCtrl.feedsProvider);
router.get("/top/:limit", authentication, postCtrl.getTopPosts);
router.get("/last/:limit", authentication, postCtrl.getTheNLastPosts);
router.get("/login/:page", authentication, postCtrl.feedsAtLogin);      //route'll be used in production mode 
router.get("/post/:postID", authentication, postCtrl.focusOnPostandComments);
router.get("/:userID", authentication, postCtrl.getAllMyPosts);
router.put("/:postID", authentication, multer, postCtrl.updatePost);
router.put("/like/:postID", authentication, postCtrl.likePost);


//  **admin only**
router.put("/status/:postID", authentication, postCtrl.unpublishPost);


router.delete("/:postID", authentication, postCtrl.deletePost);
router.delete("/user/:userID", authentication, postCtrl.deleteAllMyPostsAndCo);

module.exports = router;