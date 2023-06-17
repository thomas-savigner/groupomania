
//-----       imports       -----

const fs = require("fs");
const { Sequelize } = require("../models");
const db = require("../models");
const Post = db.Posts;
const User = db.Users;
const Op = Sequelize.Op;




//-----     controllers for CRUD operations on posts table and associates     -----

exports.createPost = (req, res) => {

    let imagePath = ""
    if (req.file) {
        imagePath = `${req.protocol}://${req.get("host")}/uploads/post-images/${req.file.filename}`
    } else {
        imagePath = ""
    }

    const myPost = {
        userID: req.auth.tokenUserId,
        hashtags: req.body.hashtags,
        topic: req.body.topic,
        article: req.body.article,
        imageUrl: imagePath,
        isRelease: req.body.isRelease,
    }

    Post.create(myPost)
        .then((data) => { res.status(200).send(data)})
        .catch((error) => { res.status(500).send(error)})        

}

exports.feedsProvider = (req, res) => {
         
            Post.findAll({
                where: {
                    isRelease: true,
                    isPublish: true,
                },
                attributes: ['postID', 'hashtags', 'topic', 'article', 'imageUrl', 'isRelease', 'createdAt',
                                'postCommentsModifiedAt', 'readings', 'likes', 'numberOfComments',
                            ],
                include: [{
                    
                    association: 'userP',
                    attributes: ['firstName', 'lastName', 'avatarUrl'],
                    include: [{
                        association: 'department',
                        attributes: ['name'],
                    }],
                }],
                order: [['postID', 'DESC']]
                })
                .then((posts) => {
                    res.status(200).json( { 'result': posts } );
                });
}

exports.feedsAtLogin = (req, res) => {
   
    User.findOne({
        where: {
            userID: req.auth.tokenUserId,
        }
    },)
        .then( (user) => {
            const lastLogoutDate = user.loggedOutAt;
             
            let limit = 5;
            let offset = 0;
            
            Post.findAndCountAll({
                    where: {
                        isRelease: true,
                        isPublish: true,
                        postCommentsModifiedAt: {
                            [Op.gte]: lastLogoutDate,
                        }}
                })
                .then((data) => {
                    let page = req.params['page'];
                    let pages = Math.ceil(data.count / limit);
                    
                    offset = limit * (page - 1);
                    
                    Post.findAll({
                        where: {
                            isRelease: true,
                            isPublish: true,
                            postCommentsModifiedAt: {
                                [Op.gte]: lastLogoutDate,
                            }
                        },
                        attributes: ['postID', 'hashtags', 'topic', 'article', 'imageUrl', 'isRelease',
                                        'createdAt','postCommentsModifiedAt', 'readings', 'likes',
                                    ],
                        include: [{
                            association: 'userP',
                            attributes: ['firstName', 'lastName', 'avatarUrl'],
                            include: [{
                                association: 'department',
                                attributes: ['name'],
                            }],
                        }],
                        limit: limit,
                        offset: offset,
                        order: [['postCommentsModifiedAt', 'DESC']]
                        })
                        .then((posts) => {          //  ******* add next page: bool
                            res.status(200).json({'result': posts, 'count': data.count, 'pages': pages});
                        })
                        .catch((err) => { res.status(404).send("Problem at results pagination : "+err)});
                    })

        })
        .catch((err) => { res.status(404).send("User not found ! : "+err)})

}

exports.focusOnPostandComments = (req, res) => {

    Post.findOne({
            where: {
                postId: req.params['postID'],
                isRelease: true,
            },
            attributes: ['postID', 'hashtags', 'topic', 'article', 'imageUrl', 'isRelease',
                            'createdAt', 'postCommentsModifiedAt', 'readings', 'readers',
                            'likes', 'likers', 'numberOfComments',
            ],
            include: [{
                association: 'userP',
                attributes: ['firstName', 'lastName', 'avatarUrl'],
                include: [{
                    association: 'department',
                    attributes: ['name'],
                }],
            }, {
                association: 'pstComments',
                required: false,
                where: {
                    isPublish: true,
                },
                attributes: ['commentID', 'userID', 'postID', 'content', 'createdAt'],
                include: [{
                    association: 'userC',
                    attributes: ['firstName', 'lastName', 'avatarUrl'],
                }],
            }],
        })
        .then((data) => {

            //  Process to update post data if user ever read post or not
            let readingsNbr = null;
            const everRead = data.readers.includes(req.auth.tokenUserId);
            if (!everRead) {    //  increment post.readings, save reader
                readingsNbr = data.readings+1;
                let readersArray = data.readers;
                readersArray.push(req.auth.tokenUserId);
                         
                data.set({
                    readings: readingsNbr,
                    readers: readersArray,
                })
                data.save()
                    .then(console.log("reading inc, reader added ; Post updated"))   
                    .catch((error) => res.status(500).send("Problem while saving new reader, try again - error"+error ))
               
            } else {
                readingsNbr = data.readings;
            }
            
            let likesNbr = data.likes;

            //  does user ever like post ?
            let heartHasColor = false;
            if (data.likers.includes(req.auth.tokenUserId)) {
                heartHasColor = true;    
            }

            let result = [data, readingsNbr, likesNbr, heartHasColor]

            return result
        })
        .then((result) => {
        
            let post = result[0];
            let readings = result[1];
            let likesNbr = result[2];
            let heartHasColor = result[3];

            res.status(200).json({'postComments': post, 'readingsNbr': readings, 'likesNbr': likesNbr, 'heartHasColor': heartHasColor})
        })
        .catch((err) => { res.status(404).send("I don't find it ! Try again...later... Here is the error :  "+err )})

}

exports.getAllMyPosts = (req, res) => {

Post.findAll(
    {
        where: {
            isPublish: true,
            userID: req.params['userID'],
        },
        attributes: ['postID', 'hashtags', 'topic', 'article', 'imageUrl', 'isRelease',
                        'postCommentsModifiedAt', 'readings', 'likes', 'numberOfComments', 'isPublish'
                    ],
        include: [{
            association: 'pstComments',
            required: false,
            where: {
                isPublish: true
            },
            attributes: ['content'],
            include: [{
                association: 'userC',
                attributes: ['firstName', 'lastName', 'avatarUrl'],
            }]
        }],
        order: [['postCommentsModifiedAt', 'DESC']]
    }
    )
    .then((posts) => {          //  ******* add next page: bool
        res.status(200).json( {'results': posts} );
    })
    .catch((error) => {res.status(500).send('Internal Server Error ::> '+error)})

}

exports.updatePost = (req, res) => {

    Post.findOne({
        where: {
            postID: req.params['postID'],
            isPublish: true,
        },
        })
        .then( (post) => {

            if (post.userID !== req.auth.tokenUserId) {
                res.status(403).send("Unauthorized request: you're not the post's author")                
            }

            if (req.file) {

                fileName = post.imageUrl.split('/uploads/post-images/')[1];
                fs.unlinkSync(`uploads/post-images/${fileName}`);
            
            }

            const postUpdated = req.file ? {
                ...req.body,
                postCommentsModifiedAt: Date.now(),
                imageUrl: `${req.protocol}://${req.get('host')}/uploads/post-images/${req.file.filename}`
            } : {
                ...req.body,
                postCommentsModifiedAt: Date.now(),
                imageUrl: post.imageUrl,
            }

            Post.update(postUpdated, {
                where: {
                    postID: req.params['postID'],
                    isPublish: true,
                },
                })
                .then( () => {
                    res.status(200).send("Post Updated")
                })   
                .catch((err) => { res.status(500).send("Problem at updating DB: " + err)})
        
        })
        .catch((err) => { res.status(500).send("Internal Server error : " + err)})

}

exports.likePost = (req, res) => {
 
    Post.findOne({
        where: {
            postID: req.params['postID'],
            isRelease:true,
            isPublish: true,
        },
        })
        .then( (post) => {

            const likerUserID = req.auth.tokenUserId;
            let likesNbr = post.likes;

            if ( post.userID === likerUserID ) {
                res.status(403).send("Unauthorized request: You can't like your post")                
            }

            //--------  Did user ever like post ?
            let likersArray = post.likers;

            const everLiked = likersArray.includes(likerUserID);
            
            if ( !everLiked ) { 
                //----  User's never liked post, he add his like on likes counter and become a liker
                let newLikesNbr = likesNbr+1;
                likersArray.push(likerUserID);
                
                post.set({
                    likes: newLikesNbr,
                    likers: likersArray,
                })

                post.save()
                    .then(
                        res.status(200).send( 
                            {
                                status: "Like saved", 
                                likesNbr: newLikesNbr 
                            } 
                        ) 
                    )   
                    .catch((error) => res.status(500).send( "Problem while saving like, try again - error : " + error ))
            } else {    
                
                //----  User's ever like post, he wants to cancel it 
                let newLikesNbr = likesNbr-1;
                const likerIndex = likersArray.indexOf( likerUserID, undefined);

                likersArray.splice( likerIndex, 1)

                post.set({
                    likes: newLikesNbr,
                    likers: likersArray,
                })

                post.save()
                .then(
                    res.status(200).send( 
                        {
                            status: "Like cancelled", 
                            likesNbr: newLikesNbr 
                        } 
                    ) 
                )    
                    .catch((error) => res.status(500).send( "Problem while cancelling like, try again - error : " + error ))
            
            }
        })
        .catch((err) => { res.status(500).send("Problem : " + err)})

}

exports.deletePost = (req, res) => {

    Post.findOne({
            where: {
                postID: req.params['postID'],
                isPublish: true,
            }
        })
        .then((post) => {

            if (post.userID !== req.auth.tokenUserId) {
                res.status(403).send("Delete process cancelled: you're not the post owner !")
            }

            const filename = post.imageUrl.split('/uploads/post-images/')[1];
            fs.unlink(`./uploads/post-images/${filename}`, ()=>{})

            Post.destroy({
                    where: {
                        postID: req.params['postID'],
                        isPublish: true,
                    }
                })
                .then( () => {
                    res.status(200).send("Post deleted")
                })
                .catch((err) => {res.send("Deletion failed - error ::>" + err)})
            
        })
        .catch((err) => {res.status(500).send("Problem :::> " + err)})

}

exports.deleteAllMyPostsAndCo = (req, res) => {
    
    const userIDValue = parseInt(req.params['userID'])

    if ( userIDValue !== req.auth.tokenUserId ) {
        res.status(403).send( "Deletion process cancelled: you're not the posts owner !" )
    }

    Post.findAndCountAll( {
            where: {
                userID: req.params['userID'],
                isPublish: true,
            }
        } )
        .then( (data) => {
            
            for (i=0; i < data.count; i++) {
                
                const filename = data.rows[i]['imageUrl'].split('/uploads/post-images/')[1];
                
                fs.unlink( `./uploads/post-images/${filename}`, 
                            () => { console.log( "post image file deleted" )
                } )
            
            }
                   
            Post.destroy( {
                    where: {
                        userID: req.params['userID'],
                        isPublish: true,
                    }
                } )
                .then( () => { res.status(200).send( "User's posts with its comments deleted" ) } )
                .catch( (err) => { res.status(500).send( "Deletions failed- error ::> " + err ) } )
            } )

        .catch( (err) => { res.status(500).send( err ) } )
        
}

exports.getTopPosts = (req, res) => {
    
    const ranks = parseInt(req.params['limit']);

    Post.findAll({
            where: {isPublish: true, isRelease: true},
            order: [['likes', 'DESC']],
            include: [{
                association: 'userP',
                attributes: ['firstName', 'lastName', 'avatarUrl'],
                include: [{
                    association: 'department',
                    attributes: ['name'],
                }]
            }],
            limit: ranks,
        })
        .then((postsliked)=>{
            let results = [];
            for (i=0; i< ranks; i++) {
                this["postNumber"+i] = {
                    postID: postsliked[i].postID,
                    userID: postsliked[i].userID,
                    firstName: postsliked[i].userP.firstName,
                    lastName: postsliked[i].userP.lastName,
                    department: postsliked[i].userP.department.name,
                    avatarUrl: postsliked[i].userP.avatarUrl,
                    hashtags: postsliked[i].hashtags,
                    topic: postsliked[i].topic,
                    article: postsliked[i].article,
                    imageUrl: postsliked[i].imageUrl,
                    postCommentsModifiedAt: postsliked[i].postCommentsModifiedAt,
                    readings: postsliked[i].readings,
                    likes: postsliked[i].likes,
                }
                results.push(JSON.stringify(this["postNumber"+i]))
            }
        
            res.status(200).send("Posts Top"+ranks+" :::> "+results)
        })
        .catch((err) => {res.status(500).send("Something wrong to get posts top ten" + err)})    


}

exports.getTheNLastPosts = (req, res) => {

    const ranks = parseInt(req.params['limit']);

    Post.findAll({
        where: {isPublish: true, isRelease: true},
        order: [['postCommentsModifiedAt', 'DESC']],
        include: [{
            association: 'userP',
            attributes: ['firstName', 'lastName', 'avatarUrl'],
            include: [{
                association: 'department',
                attributes: ['name'],
            }]
        }],
        limit: ranks,
        })
        .then((lastPosts)=>{
            let results = [];
            for (i=0; i< ranks; i++) {
                this["postNumber"+i] = {
                    postID: lastPosts[i].postID,
                    userID: lastPosts[i].userID,
                    firstName: lastPosts[i].userP.firstName,
                    lastName: lastPosts[i].userP.lastName,
                    department: lastPosts[i].userP.department.name,
                    avatarUrl: lastPosts[i].userP.avatarUrl,
                    hashtags: lastPosts[i].hashtags,
                    topic: lastPosts[i].topic,
                    article: lastPosts[i].article,
                    imageUrl: lastPosts[i].imageUrl,
                    postCommentsModifiedAt: lastPosts[i].postCommentsModifiedAt,
                    readings: lastPosts[i].readings,
                    likes: lastPosts[i].likes,
                }
                results.push(JSON.stringify(this["postNumber"+i]))
            }
            
            res.status(200).send("Last "+ranks+" Posts :::>" + results)})
        .catch((err)=>{{res.status(500).send("Something wrong to get last posts headers" + err)}})

}

exports.unpublishPost = (req, res) => {
    
    const amIAdmin = () => {
        
        User.findOne( {where: {userID: req.auth.tokenUserId} })
            .then( (admin) => {
                const boolAdmin = admin.isAdmin;
                return boolAdmin;
            })
            .catch((error) => res.status(500).send({error}))
    }

    Post.findOne( {where: {postID: req.params['postID']}} )
        .then( (post) => {

            if (amIAdmin === false) {
                res.status(403).send("Unauthorized request !..: don't think about it")
            } else {
                if (post.isPublish === true) {
                    post.isPublish = false
                    console.log("Post unpublished")
                } else {
                    post.isPublish = true
                    console.log("Post published")
                }
            };
    
            post.save()
                .then(res.status(200).send("Post publish status modified"))
                .catch((error) => {res.status(500).send( "Problem while saving new publish status :::> " + error )})
        })   
        .catch((error) => res.status(500).send({error}))

}