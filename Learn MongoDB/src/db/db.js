const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sujal:a94pgPV7omJzy5Jf@backend-course.x53a000.mongodb.net/maggie')
    console.log('Connected to MongoDB')
}

module.exports = connectDB