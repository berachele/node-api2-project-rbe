const express = require('express')
const postsRouter = require('./posts/posts-router')

const server = express();
const port = 4000

server.use(express.json())

server.get('/', (req, res) => {
    res.json({query: req.query, params: req.params, headers: req.headers})
})

server.use('/api/posts', postsRouter)

server.listen(port, () => {
    console.log('\n **SERVER IS RUNNING** \n')
})