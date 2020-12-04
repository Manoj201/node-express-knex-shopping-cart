import aws from "aws-sdk";


const getAvatar = async (id, s3Params) => {
  const s3 = new aws.S3(s3Params);
  const params = { Bucket: "gmp-shopping-cart/avatar", Key: id };
  const data = await s3.getObject(params).promise();
  return data;
};

export default {
  getAvatar,
};
