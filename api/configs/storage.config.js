const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary'); 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req) => {
      if (req.path === '/restaurants') {
        return 'iron-fork/restaurants';
      } else if (req.path === '/users') {
        return 'iron-fork/users';
      } else {
        return 'iron-fork/misc';
      }
    },
    format: (req, file) => {
      return 'png';
    },
    public_id: (req, file) => {
      if (req.path === '/restaurants') {
        return req.body.name;
      } else if (req.path === '/users') {
        return req.body.username;
      } else {
        return null;
      }
    }
  }
})

module.exports = multer({ storage });