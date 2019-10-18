const { Router } = require('express');
const { model } = require('mongoose');
const router = Router()

const clientModel = require('../model/Client')

router.get('/', async (req, res) => {
    try {
        const clients = await clientModel.find();
        buildRespose(res, clients);
    } catch (err) {
        buildRespose(res, null, err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const client = await clientModel.findById(req.params.id);
        buildRespose(res, client);
    } catch (err) {
        buildRespose(res, null, err);
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        const client = new clientModel({ name, email });
        await client.save();

        buildRespose(res, client);
    } catch (err) {
        buildRespose(res, null, err);
    }
})

router.put('/:id', async (req, res) => {
    res.status(500).json({ message: 'Not Implemeted' })
});

router.delete('/:id', async (req, res) => {
    try {
        const doc = await clientModel.findByIdAndDelete(req.params.id);
        buildRespose(res, doc);
    } catch (err) {
        buildRespose(res, null, err);
    }
})


function buildRespose(res, result, err) {
    if (err) {
        res.status(500);
        res.json(err);
    } else {
        res.status(200);
        res.json(result);
    }
}


module.exports = router;