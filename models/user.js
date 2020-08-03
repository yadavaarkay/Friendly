const mongoose = require('mongoose');
const multer  = require('multer')
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars')


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
      },
    name:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
     //CHANGE: include an array of all the posts(ids will be stored) in the user schema itself. This field will make searching fast in the DB
    posts: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post'
      }
  ]

},{
    timestamps: true
});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

// static methods
userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;
   

const User = mongoose.model('User', userSchema);
module.exports = User;