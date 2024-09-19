const { extname } = require("path");
const multer = require("multer");
const storage = multer.diskStorage({

  destination: "build/img",

  filename: (req, file, cb) => {
    const fileName =
      Date.now().toString() + extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
