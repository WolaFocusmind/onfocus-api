const fileType = require("file-type");
const { v4: uuid } = require("uuid");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const store = async (content) => {
  const { ext } = await fileType.fromBuffer(content);
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Body: content,
    Key: `${uuid()}.${ext}`,
  };
  return s3.upload(params).promise();
};

module.exports = {
  store,
};
