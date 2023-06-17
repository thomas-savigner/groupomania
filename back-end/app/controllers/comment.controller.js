
//  imports
const db = require("../models");
const Post = db.Posts;
const Comment = db.Comments;



//-----     controllers for CRUD operations on comments table and associates        -----


exports.createComment = (req, res) => {

    const myComment = {
        postID: req.body.myComment.postID,
        userID: req.auth.tokenUserId,
        content: req.body.myComment.content,
    }

    Comment.create(myComment)
        .then((data) => { res.status(200).send(data)})
        .catch((error) => { res.status(500).send(error)})
    

    const postID = myComment.postID;

    Post.findOne({where: {postID: postID} })
        .then( (post) => {

            post.numberOfComments = post.numberOfComments+1;

            post.postCommentsModifiedAt = Date.now();

            post.save()
                .then(console.log("Post concerned: updatedAt column updated"))
                .catch((error) => res.status(500)
                                    .send( {"Problem while updating post data, try again; here is error message : ": error } ))

        })
}

exports.getAllMyComments = (req, res) => {
    let limit = 5;
    let offset = 0;
    
    Comment.findAndCountAll({
            where: {
                isPublish: true,
                userID: req.params['userID'],
            }
         })
        .then((data) => {
            let page = req.params['page'];
            let pages = Math.ceil(data.count / limit);
            
            offset = limit * (page - 1);
            
            Comment.findAll({
                where: {
                    isPublish: true,
                    userID: req.params['userID'],
                },
                attributes: ['userID', 'postID', 'content'],
                limit: limit,
                offset: offset,
                order: [['updatedAt', 'DESC']]
            })
                .then((comments) => {
                    res.status(200).json({'results': comments, 'count': data.count, 'pages': pages});
                });
        })
        .catch((error) => {res.status(500).send('Internal Server Error ::> ' + error)})

}

exports.updateComment = (req, res) => {
   
    Comment.findOne({
            where: {
                commentID: req.params['commentID'],
                isPublish: true,
            }
        })
        .then( (comment) => {

            if (comment.userID !== req.auth.tokenUserId) {
                res.status(403).send("Unauthorized request: you're not the comment's author")                
            }

            Comment.update(req.body, {
                where: {
                    commentID: req.params['commentID'],
                    isPublish: true,
                },
                })
                .then( () => {
                    
                    Post.findOne({
                            where: {
                                postID: comment.postID,
                                isPublish: true,
                                isRelease: true,
                            }
                        })
                        .then((post) => {

                            const newData = {
                                ...post.dataValues,
                                hashtags: JSON.parse(post.dataValues.hashtags).join(' '),
                                readers: JSON.parse(post.dataValues.readers),
                                likers: JSON.parse(post.dataValues.likers),
                                postCommentsModifiedAt: Date.now()
                            }
                            
                            Post.update(newData, {
                                    where: {
                                        postID: comment.postID,
                                        isRelease: true,
                                        isPublish: true,
                                    }
                                })
                                .then(()=> {res.status(200).send("comment updated & post timestamp too"+ JSON.stringify(newData))})
                                .catch((err)=>{console.log("Problem when updating post column postCommentsModifiedAt - error :>>" + err)})
                        })
                        .catch((err)=>{console.log("I don't find Post associated when I want to update post column postCommentsModifiedAt + error :>>" + err)})
        
                })   
                .catch((err) => { res.status(500).send("Problem at updating DB: " + err)})
            
                    })
        .catch((err) => { res.status(500).send("Problem : " + err)})
}

exports.deleteComment = (req, res) => {

    Comment.findOne({
            where: {
                commentID: req.params['commentID'],
                isPublish: true,
            }
        })
        .then((comment) => {

            if (comment.userID !== req.auth.tokenUserId) {
                res.status(403).send("Delete process cancelled: you're not the comment owner !")
            }

            Comment.destroy({
                    where: {
                        commentID: req.params['commentID'],
                        isPublish: true,
                    }
                })
                .then( () => {
                    
                    Post.findOne({where: {postID: comment.postID, isRelease: true}})
                        .then( (post) => {

                            post.numberOfComments = post.numberOfComments--;
                            
                            post.save()
                                .then(console.log("Post concerned: updatedAt column updated"))
                                .catch((error) => res.status(500).send( {"Problem while updating post data, try again; here is error message : ": error } ))
                        
                        })
                
                    res.status(200).send("Comment deleted")
                })
                .catch((err) => {res.send("Deletion failed - error ::>" + err)})
        })
        .catch((err) => {res.status(500).send("Problem :::> " + err)})

}

exports.deleteAllMyComments = (req, res) => {

    const userIDValue = parseInt(req.params['userID'])

    if (userIDValue !== req.auth.tokenUserId) {
        res.status(403).send("Deletion process cancelled: you're not the comments owner !")
    }

    Post.findAll( { 
                    where: { isPublish: true },
                    include: [ { association: 'postC', where: { userID: req.params['userID'] } } ], 
                  }
        )       
        .then( (posts) => {

            posts.numberOfComments = posts.numberOfComments--;
                    
            posts.save()
                .then(console.log("Comments removing process : associated posts data updated"))
                .catch((error) => res.status(500).send( {"Problem while updating associated posts data, try again; here is error message : ": error } ))
        } )
        .catch( (err) => { res.send( "Can't find all posts associated with user's comments - Error message : "+err ) } )

    Comment.destroy( {
                        where: {
                            userID: req.params['userID'],
                            isPublish: true,
                        }
                } )
                .then( () => { res.status(200).send( "Comments deleted" ) } )
                .catch((err) => {res.send("Deletions failed - error ::> " + err)})

}

exports.unpublishComment = (req, res) => {
    
    const amIAdmin = () => {
        
        User.findOne( {
                where: {
                    userID: req.auth.tokenUserId
                }
            })
            .then( (admin) => {
                const boolAdmin = admin.isAdmin;
                return boolAdmin;
            })
            .catch((error) => res.status(500).send({error}))
    }

    Comment.findOne( {where: {commentID: req.params['commentID']}} )
        .then( (comment) => {

            if (amIAdmin === false) {
                res.status(403).send("Unauthorized request !..: don't think about it")
            } else {
                if (comment.isPublish === true) {
                    comment.isPublish = false
                    console.log("comment unpublished")
                } else {
                    comment.isPublish = true
                    console.log("comment published")
                }
            };
    
            comment.save()
                .then(res.status(200).send("comment publish status modified"))
                .catch((error) => {res.status(500).send( "Problem while saving new publish status :::> " + error )})
        })   
        .catch((error) => res.status(500).send({error}))

}