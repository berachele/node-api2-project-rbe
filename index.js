const express = require('express')

const server = express();
const port = 4000

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Hello from Express')
})

server.listen(port, () => {
    console.log('\n **SERVER IS RUNNING** \n')
})