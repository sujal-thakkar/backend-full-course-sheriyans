const express = require('express')
const userModel = require('../models/user.model')

const router = express.router()

router.post('/create', async (req, res) => {
    console.log(req.body);
    console.log(req.cookies);

    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findOne({
            _id: decoded.id
        })

        console.log(user)
        if(!user) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        
    } catch (error) {
        return res.status(401).json({
            message: 'Token not valid'
        })
    }
    
    res.send('post created successfully')
})

module.exports = router