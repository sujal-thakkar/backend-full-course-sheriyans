const express = require('express')

const app = express()

app.use(express.json())

const notes = []

// POST method to create a new note:
app.post('/notes', (req, res) => {
    notes.push(req.body)
    res.status(201).json({
        message: "note created successfully"
    })
})

// GET method to access/retrieve a note from server:
app.get('/notes', (req, res) => {
    res.status(200).json(notes)
})

// DELETE method to delete a note from server:
app.delete('/notes/:id', (req, res) => {
    const id = req.params.id
    delete notes[id]
    res.status(200).json({
        message: "note deleted successfully"
    })
})

// PATCH method to change data that is already there in the server (change description of a note)
app.patch('/notes/:id', (req, res) => {
    const id = req.params.id
    const desc = req.body.description
    notes[id].description = desc
    res.status(200).json({
        message: "note updated successfully"
    })
})




module.exports = app