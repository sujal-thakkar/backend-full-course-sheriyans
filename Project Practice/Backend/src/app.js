const express = require('express')
const cors = require('cors')
const PostModel = require('./models/post.model')
const uploadFile = require('./services/imagekit.service')
const multer = require('multer')

const app = express()

app.use(cors())
app.use(express.json())

const upload = multer({storage: multer.memoryStorage})

app.post('/posts', upload.single("image"), async(req, res) => {
    const result = await uploadFile(req.file.buffer)

    const post = await PostModel.create({
        image: result.url,
        caption: req.body.caption
    })

    return res.status(201).json({
        message: 'post created',
        post
    })
})


module.exports = app