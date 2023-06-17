
const db = require("../models");
const Post = db.Posts;
const Comment = db.Comments;
const faker = require('@faker-js/faker/locale/fr');



exports.createFakeComments = () => {
    
    let fieldsArray =[];        

    for (let j=531; j<691; j++) {
        
        const setIdFields = function() {
            return (Post.findByPk(j)
                        .then( function(response) {
                            if (response !== null) {
                                const dataSet = {
                                    postID: response.dataValues.postID,
                                    readersArray: JSON.parse(response.dataValues.readers), 
                                }
                                return dataSet
                            }
                        })
            )
        }  
               
        const getIdFields = setIdFields()
        
        const plug =()=> getIdFields.then(function(result) {
            return result
        })

        fieldsArray.push(plug())
   
    }
            
     Promise.all( fieldsArray )
            .then((fieldsArrayValues ) => {
                let myComments = []
                
                for (k=0; k<25; k++) {
                
                    const postSelected = fieldsArrayValues[Math.floor(Math.random() * fieldsArrayValues.length)];
                    const postID = postSelected.postID;
                    const commentWriter = postSelected.readersArray[Math.floor(Math.random() * postSelected.readersArray.length)];
                    
                    const myComment ={
                            userID: commentWriter,
                            postID: postID,
                            content: faker.lorem.paragraph(5),
                    }
                    
                    myComments.push(myComment);

                }

                Comment.bulkCreate(myComments)
                        .then( (response) => {
                            console.log("commentS saved in DB")
                        })
                        .catch( (err) =>{ console.log("Big Problem while saving to DB:" + err)})
                        
                return myComments

            })
            .then((myComments) => {
                
                for (w=0; w < myComments.length; w++) {
                    Post.findByPk( myComments[w].postID)
                        .then( (post) => {
                            
                            post.numberOfComments = post.numberOfComments+1;
                            post.save()
                            
                        })
                }
            })
            .catch((err) => { console.log(err) })
 
}