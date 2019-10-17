const { Router } = require('express');
const { model } = require('mongoose');
const router = Router()

const clientModel = require('../model/Client')

router.get('/', async (req, res) => {
    const clients = await clientModel.find();
    res.json(clients);
})

router.get('/:id', async (req, res) => {
    const client = await clientModel.findById(req.params.id);
    res.json(client);
})

router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;

        const client = new clientModel({ name, email });

        await client.save();

        res.json(client);
    } catch (err) {
        res.status(500);
        res.json(err);
    }
})

router.delete('/:id', async (req, res) => {
    var result;

    try {
        console.log(req.params.id);

        const doc = await clientModel.findByIdAndDelete(req.params.id);

        res.status(doc ? 200 : 404);
        const message = doc ? "Deleted" : "Not Found";
        res.send({message})
    } catch (err) {
        res.status(500);
        res.json(err);
    }
})

module.exports = router;