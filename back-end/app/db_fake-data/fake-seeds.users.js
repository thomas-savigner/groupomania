
const db = require("./app/models");
const User = db.Users;
const bcrypt = require('bcrypt');
const faker = require('@faker-js/faker/locale/fr');
const fs = require('fs');
const https = require('https');

//  Set up Global configuration access with isolated parameters
dotenv.config();
 

exports.createFakeUser = () => {

    let fakeUserArray = [];
                                
    for ( let i=0; i<10; i++) {
            const url = faker.image.avatar(); 
                            
            const fileName = url.replace(/^.*[\\\/]/, '');
            const newFileName = 'avatar_' + fileName.slice(0, -4) + "_" + Date.now() + '.jpg';
            const avatarUrl = `http://localhost:4039/uploads/user-avatars/${newFileName}`;
     
            https.get(url, (res) => {
                // Image will be stored at this path
                const path = `${__dirname}/uploads/user-avatars/${newFileName}`;
                const filePath = fs.createWriteStream(path);

                res.pipe(filePath);
                filePath.on('finish', () => {
                    filePath.close();
                    console.log('Download Completed');
                });
            })
            
            function randomIntFromInterval(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            const rndInt = randomIntFromInterval(1, 6);

            const lastName = faker.name.lastName(); 
                
            const firstName = faker.name.firstName()
                
            const firstLetter = firstName.charAt(0);
            const mail = firstLetter.toLowerCase() + lastName.toLowerCase() + '@groupomania.fr';
                
            const pwd = process.env.USERAPPPASSWORD;
            const hash = bcrypt.hashSync(pwd, 10);
            const fakeUser = {
                    firstName: firstName,
                    lastName: lastName,
                    avatarUrl: avatarUrl,
                    departmentID: rndInt,
                    email: mail,
                    password: hash,
                    loggedInAt: Date.now(),
            }
            fakeUserArray.push(fakeUser)
              
    }

    console.log(fakeUserArray)
                
    User.bulkCreate(fakeUserArray)
        .then( (response) => {
            console.log(response);
            console.log("User accountS created");
        })
        .catch((error) => console.log(error));
        
}
 
        


