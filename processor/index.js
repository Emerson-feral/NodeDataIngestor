const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports.handler = async (event) => {
  try {
    const bucket = "files-to-processs";
    const key = "test.json";

    const params = {
        Bucket: bucket,
        Key: key,
    };

    const data = await s3.getObject(params).promise();
    
    const content = data.Body.toString('utf-8');

    let objContent = JSON.parse(content);
    objContent.gender = "Male";

    const objectData = JSON.stringify(objContent)

    const bucketProcessed = "post-processed-file"

    const params2 = {
        Bucket: bucketProcessed,
        Key: "processed", 
        Body: objectData, 
        ContentType: 'application/json', 
      };

    await s3.upload(params2).promise()


    return {
        statusCode: 200,
        body: JSON.stringify('File processed successfully!'),
    };
} catch (err) {
    console.error('Error processing the file:', err);
    return {
        statusCode: 500,
        body: JSON.stringify('Error processing the file'),
    };
}
};
