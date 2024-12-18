const multer = require("multer");
const path = require("path");

//storage configuration

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/"); //foder for uploading
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //filename
    },
});

//filter to accept image

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"), false);
    }
};

//multer instance

const upload = multer({ storage, fileFilter });

module.exports = upload;