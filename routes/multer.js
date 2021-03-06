const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

aws.config.update({
  secretAccessKey:
    process.env.aws_secret || "Iu23OiTcxCnANZMij0D2w7VCRbr2EX8xQYn0kPqF",
  accessKeyId: process.env.aws_id || "AKIAJKM42I2JJIMGKDWQ",

  region: "us-east-2"
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "eisimageupload",
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

module.exports = upload;
