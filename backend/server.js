const hamstersRouter = require('./routes/hamster.js')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 1337



// Setup MiddleWare
app.use( express.static(__dirname + '/../build') )
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(require('cors')());
app.use((req, res, next) => {
	console.log(`  ${req.method}  ${req.url} `, req.body)
	next()
})


//Exprss-static
app.use('/img/:filnamn', express.static(__dirname + '/hamsters'))
app.use('/', express.static(__dirname + '/../evaluate'))

//Roter for Endpoint
app.use('/hamsters', hamstersRouter)
// app.get('*', (req, res) => {
// 	res.sendFile(__dirname + '/../build/index.html')
// })



app.listen(PORT, () => {
	console.log(`Server is working on ${PORT}`)
})