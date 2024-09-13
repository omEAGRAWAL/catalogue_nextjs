const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.uploadFile = (file) => {
  
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return s3.upload(params).promise();
};
