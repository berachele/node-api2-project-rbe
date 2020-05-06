const express = require('express')
const router = express.Router()

const Blog = require('../data/db')

// POST 🥳   /api/posts              Creates a post using the information sent inside the `request body`.
router.post('/', (req, res) => {
    const newPost = req.body
    if(!newPost.title || !newPost.contents){
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    } else {
        Blog.insert(newPost)
        .then(success => {
                Blog.findById(success.id)
                .then(otherSuccess => {
                    res.status(201).json(otherSuccess)
            
        })
        .catch(err => {
            console.log({err})
            res.status(500).json({
                error: "There was an error while saving the post to the database."
            })
        })
    })
} //end of else
}) //end of post

//POST 🥳   /api/posts/:id/comments  Creates a comment for the post with the specified id using information sent inside of the `request body`.                                                                   
router.post('/:id/comments', (req, res) => {
    //first I need to findCommentById
    const id = req.params.id
    Blog.findCommentById(id)
    .then(success => {
        //then I can insertComment
        if(success){
            if(!req.body.text){
                res.status(400).json({
                    errorMessage: "Please provide text for the comment."
                })
            } else {
            console.log({success})
            Blog.insertComment(req.body)
            .then(otherSuccess => {
                if(otherSuccess){
                    Blog.findCommentById(otherSuccess.id)
                    .then(thirdSuccess => {
                        res.status(201).json(thirdSuccess)
                    })
                    
                }else {
                    console.log("Try Again..")
                }
            })//end of .then 2
            .catch(err => {
                console.log({err})
                res.status(500).json({
                    error: "There was an error while saving the comment to the database"
                })
            })//end of .catch 2
            } //end of if/else 2 else
        }else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }//end of if/else 1 else
    })//end of .then 1
    .catch(err => {
        console.log({err})
        res.status(500).json({
            error: "There was an error while saving the comment to the database"
        })
    })//end of .catch 1
})//end of POST

//GET 🥳     /api/posts               Returns an array of all the post objects contained in the database.                                                                                                         
router.get('/', (req, res) => {
    Blog.find()
    .then(success => {
        res.status(200).json(success)
    })
    .catch(err => {
        console.log({err})
        res.status(500).json({
            error: "The post information could not be retrieved."
        })
    })
})

//GET 🥳    /api/posts/:id           Returns the post object with the specified id.                                                                                                                              
router.get('/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
    .then(success => {
        if(success){
            res.status(200).json(success)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        console.log({err})
        res.status(500).json({
            error: "The post information could not be retrieved."
        })
    })
})

//GET 🥳    /api/posts/:id/comments  Returns an array of all the comment objects associated with the post with the specified id.                                                                                 
router.get('/:id/comments', (req, res) => {
    const id = req.params.id
    Blog.findPostComments(id)
    .then(success => {
        if(success){
            res.status(200).json(success)
        }else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        console.log({err})
        res.status(500).json({
            error: "The comments information could not be retrieved."
        })
    })
})

//DELETE 🥳 /api/posts/:id           Removes the post with the specified id and returns the **deleted post object**. 
//You may need to make additional calls to the database in order to satisfy this requirement. 
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Blog.remove(id)
    .then(success => {
        if(success === 1){
            Blog.find()
            .then(otherSuccess => {
                res.status(200).json(otherSuccess)
            })
        }else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        console.log({err})
        res.status(500).json({
            error: "The post could not be removed."
        })
    })
})

//PUT 🥳    /api/posts/:id           Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put('/:id', (req, res) => {
    const id = req.params.id
    if(!req.body.title || !req.body.contents){
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
    Blog.update(id, req.body)
    .then(success => {
        if(success === 1){
            res.status(200).json(req.body)
        } else{
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        console.log({err})
        res.status(500).json({
            error: "The post information could not be modified."
        })
    })
})


module.exports = router