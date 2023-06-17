
const db = require("../models");
const User = db.Users;
const Post = db.Posts;
const faker = require('@faker-js/faker/locale/fr');
const fs = require('fs');



exports.createFakePosts = () => {

        let respArray =[];        

        for (let j=3613; j<3823; j++) {
            
            const checkID = function() {
                return (User.findByPk(j)
                            .then( function(response) {
                                if (response !== null) {
                                    return response.dataValues.userID 
                                }
                            })
                )
            }  
                   
            const getCheckID = checkID()
            
            const plug =()=> getCheckID.then(function(result) {
                return result
            })
            
            respArray.push(plug())   
            
        }             
                        
            Promise.all(respArray).then((values) => {   
            
                const userIDPossible = values.filter(function (element) {return element !== undefined })
            
                let myPosts =[]

                for (let p=0; p<10; p++) {
                    function rdmUserID() {
                        return userIDPossible[Math.floor(Math.random() * userIDPossible.length)]};
                    const userID = rdmUserID();
                    
                    //************* 
                    const sourceDirImages = 'D:/data/OpenClassrooms/P7/photos/backend/postphotos/'
                    const targetDirImages = 'D:/data/Git/ThomasSavigner_7_25042022/back-end/uploads/post-images/'
                    const files = fs.readdirSync(sourceDirImages);
                    let choosedFile= files[Math.floor(Math.random() *files.length)]

                    const newFileName = 'post_' + choosedFile.slice(0, -4) + "_" + Date.now() + '.jpg';

                    const source = sourceDirImages+choosedFile;
                    const target = targetDirImages+newFileName

                    fs.copyFileSync( source, target );        
                    //************* 
                    const stringHashtags = `#${faker.random.word()} #${faker.random.word()} #${faker.random.word()}`;
                    //************* 
                    const postTopic =  faker.lorem.sentence();
                    //************* 
                    const postArticle = faker.lorem.paragraphs(8);
                    //************* 
                    const imagePath = 'http://localhost:4039/uploads/post-images/' + newFileName;
                    //************* 
                    function randomIntFromInterval(min, max) {
                        return Math.floor(Math.random() * (max - min + 1) + min);
                    }

                    const readingsNumber = randomIntFromInterval(1, userIDPossible.length);
                    
                    let readersArray = userIDPossible.sort(() => Math.random() - Math.random()).slice(0, readingsNumber)
                    //******** 
                    const likesNumber = randomIntFromInterval(1, readingsNumber);
                    
                    let likersArray = readersArray.sort(() => Math.random() - Math.random()).slice(0, likesNumber)
                    
                    const myPost = {
                        
                        userID: userID,
                        hashtags: stringHashtags,
                        topic: postTopic,
                        article: postArticle,
                        imageUrl: imagePath,
                        readings: readingsNumber,
                        readers: readersArray,
                        likes: likesNumber,
                        likers: likersArray,
                    };

                    myPosts.push(myPost)
        
                }

                Post.bulkCreate(myPosts)
                    .then((response)=> {
                        console.log(response)
                        console.log("PostS uploaded to DB");
                    })
                    .catch((err) => console.log(err));
            })
}