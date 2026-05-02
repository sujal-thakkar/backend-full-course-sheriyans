const {ImageKit, toFile} = require('@imagekit/nodejs')

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  timeout: 5 * 60 * 1000,
  maxRetries: 0
});

const uploadFile = async (buffer, fileName = 'image.jpg') => {
  const file = await toFile(buffer, fileName)

  const result = await imagekit.files.upload({
    file,
    fileName
  })

  return result
}

module.exports = uploadFile