const { ImageKit, toFile } = require('@imagekit/nodejs');

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
    timeout: 5 * 60 * 1000,
    maxRetries: 0
});

const uploadFile = async(Buffer, fileName = 'image.jpg') => {
    const file = await toFile(buffer, fileName)
    const result = await client.files.upload({
        file, 
        fileName
    })

    return result;
}

module.exports = uploadFile