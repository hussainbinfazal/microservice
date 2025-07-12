const express = require('express')
const expressProxy = require('express-http-proxy')

const app = express()


app.use('/auth', expressProxy('http://localhost:3001'))
app.use('/product', expressProxy('http://localhost:3002'))
app.use('/order', expressProxy('http://localhost:3003'))

app.listen(3000, () => {
    console.log('Gateway server listening on port 3000')
})