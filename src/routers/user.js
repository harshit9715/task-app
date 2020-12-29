const express = require('express')
const sharp = require('sharp')

const User = require('../models/users')
const auth = require('../middleware/auth')
const {sendWelcomeEmail, sendGoodbyeEmail} = require('../emails/account')
const router = express.Router()


const multer = require('multer');


router.post('/users', async (req, res)=> {
    const user = new User(req.body)
    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e);
    }

})

router.post('/users/login', async (req, res)=> {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/users/logout', auth, async (req, res)=> {
    try {
        // Global logout will have body {"global": true}
        if (req.body && req.body.global)
            req.user.tokens = []
        else
            req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (e) {
        console.log('error', e);
        res.status(500).send();
    }
})

router.get('/users/me', auth, async (req, res)=> {
        res.send(req.user)
})
// Not required 

// router.get('/users/:id', auth, async (req, res)=> {
//     try {
//         const _id = req.params.id
//         if (_id.length != 24) 
//             return res.status(404).send()
//         const user = await User.findById(_id)
//         if (!user)
//             return res.status(404).send()
//         res.status(200).send(user)
//     } catch (e) {
//         console.log(e)
//         res.status(500).send();
//     }
// })

router.put('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    if (!updates.every(item => allowedUpdates.includes(item))) {
        return res.status(400).send({ 'error': 'Invalid updates!'})
    }
    try {
        updates.forEach(update => req.user[update] = req.body[update])
        if (updates.includes('password'))
            req.user.tokens.filter(token => token.token === req.token)
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendGoodbyeEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Profile picture

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('File must be an image'))
        }
        cb(undefined, true)
    }
})

router.put('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {

    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        if (req.params.id.length !== 24) {
            throw new Error()
        }
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set("Content-Type","image/png")
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send()
    }
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

module.exports = router;