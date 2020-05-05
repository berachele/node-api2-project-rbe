const express = require('express')
const router = express.Router()

const Blog = require('../data/db')

// POST    /api/posts              Creates a post using the information sent inside the `request body`.
router.post('/', (req, res) => {})

//POST    /api/posts/:id/comments  Creates a comment for the post with the specified id using information sent inside of the `request body`.                                                                   
router.post('/:id/comments', (req, res) => {})

//GET     /api/posts               Returns an array of all the post objects contained in the database.                                                                                                         
router.get('/', (req, res) => {
    Blog.find()
    .then(success => {
        res.status(200).json(success)
    })
    .catch(err => {
        console.log({err})
        res.status(500).json({
            message: "the post information could not be retrieved."
        })
    })
})

//GET     /api/posts/:id           Returns the post object with the specified id.                                                                                                                              
router.get('/:id', (req, res) => {})

//GET     /api/posts/:id/comments  Returns an array of all the comment objects associated with the post with the specified id.                                                                                 
router.get('/:id/comments', (req, res) => {})

//DELETE  /api/posts/:id           Removes the post with the specified id and returns the **deleted post object**. 
//You may need to make additional calls to the database in order to satisfy this requirement. 
router.delete('/:id', (req, res) => {})

//PUT     /api/posts/:id           Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put('/:id', (req, res) => {})


module.exports = router