const express = require('express');
const User = require('../models/user');

const router = express.Router();

//create a new user
router.post('/', (req, res) => {
    const user = new User(req.body);

    user.save()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((error) => {
            res.status(500).json({error: error.message});
        })
})

//get all users
router.get('/', (req, res) => {
    User.find()
        .then((users) => {
            res.json(users);
        })
        .catch((error) => {
            res.status(500).json({error: error.message});
        })
})

//get a specific user by Id
router.get('/:id', (req, res) => {
    const userId = req.params.id;

    User.findById(userId)
        .then((user) => {
            if(!user) {
                return res.status(404).json({message: 'user not found'});
            }
            res.json(user);
        })
        .catch((error) => {
            res.status(500).json({error: error.message});
        })
})


//update a user
router.put('/:id', (req, res) => {
    const userId = req.params.id;

    User.findByIdAndUpdate(userId, req.body,{new: true})
        .then((user) => {
            if(!user){
                return res.status(404).json({messsge: 'User not found'})
            }
            res.json(user);
        })
        .catch((error) => {
            res.status(500).json({error: error.message});
        })
})

//delete a user
router.delete('/:id', (req, res) => {
    const userId = req.params.id;

    User.findByIdAndDelete(userId)
        .then((user) => {
            if(!user){
                return res.status(404).json({messsge: 'User not found'})
            }
            res.sendStatus(204);
        })
        .catch((error) => {
            res.status(500).json({error: error.message});
        })
})

module.exports = router;