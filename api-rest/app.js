const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

//Controllers
const usersController = require('./src/controllers/usersController.js')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

//Endpoints
app.get('/', (req, res) => {
  res.send({"respuesta":'¡Hola mundo!'});
})

app.post('/user', usersController.getUserByUsername)

app.listen(3000, () => {
  console.log('La aplicación está escuchando en el puerto 3000')
})