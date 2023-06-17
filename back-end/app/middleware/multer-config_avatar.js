const multer = require('multer');

//  dictionnaries for resolve the appropriate file extension
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
    //   Picking up only image file  
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' 
            && file.mimetype !== 'image/jpeg') {
        cb(null, false);
        } else {
        cb(null, true);
        }
    },

    // file destination path
    destination: (req, file, callback) => {
        callback(null, './uploads/user-avatars/');
    },

    //  building filename with timestamp in order to store single file
    filename: (req, file, callback) => {
        const name = file.originalname.slice(0, -4);
        const extension = MIME_TYPES[file.mimetype];
        callback(null, 'avatar_' + name + "_" + Date.now() + '.' + extension);
    }

});

module.exports = multer({storage: storage}).single('file');