const express = require('express')
const Works = require('../models/works')
const router = express.Router()

// get all works
router.get('/all', async (req, res) => {
    try {
        const works = await Works.find()
        res.status(200).json({ success: true, data: works })
    } catch (e) {
        res.status(500).send(e)
    }
})


// create new work
router.post('/new', async (req, res) => {
    try {
        const work = new Works(req.body)
        await work.save()
        res.status(201).json({ success: true, data: work })
    } catch (e) {
        res.status(500).send(e)
    }
})


// get a work by ID
router.get('/:id', async (req, res) => {
    try {
        const work = await Works.findById(req.params.id)
        if (!work) return res.status(400).json({ success: false, message: 'No work Found' })
        res.status(200).json({ success: true, data: work })
    } catch (e) {
        res.status(500).send(e)
    }
})


// update a work by ID
router.put('/:id', async (req, res) => {
    const allowedUpdates = ['item', 'hours', 'total']
    const updates = Object.keys(req.body)
    const isAllowed = updates.every(update => allowedUpdates.includes(update))

    if (!isAllowed) return res.status(500).json({ success: false, message: 'Bad Request' })

    const work = await Works.findById(req.params.id)

    if (!work) return res.status(404).json({ success: false, message: 'No work found!' })

    try {
        updates.forEach(update => work[update] = req.body[update])
        await work.save()
        res.status(201).json({ success: true, data: work })
    } catch (e) {
        res.status(500).json({ success: false, message: e })
    }

})

// delete a work by ID
router.delete('/:id', async (req, res) => {
    try{
        const work = await Works.findByIdAndDelete(req.params.id)
        res.status(200).json({success: true, data: work})
    }catch(e){
        res.status(500).json({success: false, message: e})
    }
})





module.exports = router