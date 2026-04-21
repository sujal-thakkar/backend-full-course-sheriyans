const express = require('express')
const noteModel = require('./models/note.model')

const app = express()

app.use(express.json())

// POST - create a note and store in DB
app.post('/notes', async (req, res)=>{
    const data = req.body
    await noteModel.create({
        title: data.title,
        description: data.description,
    })

    res.status(201).json({
        message: 'New Note Created'
    })
})

// GET - Fetch all notes from DB
app.get('/notes', async (req, res) => {
    const notes = await noteModel.find() // noteModel.find() returns and array []
    res.status(200).json({
        message: 'notes fetched from DB successfully',
        notes : notes,
    })
})

// DELETE - Delte a note from DB
app.delete('/notes/:id', async (req, res)=>{
    const id = req.params.id
    
    await noteModel.findOneAndDelete({
        _id: id
    })

    res.status(200).json({
        message: 'note deleted successfully'
    })
})

module.exports = app