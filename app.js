const express = require('express')

const app= express()

const path = require('path')

const bodyParser = require('body-parser')

app.get('/', function(req,res){

    res.send('Hola mundo!')

})

app.get('/viejo', function(req,res){

    res.redirect('/nuevo')

})

app.get('/nuevo', function(req,res){

    res.send('Hola esta es la nueva ubicacion!')

})

app.get('/pag', function(req,res){
    
    let file = path.resolve('src','index.html')

    res.sendFile(file)

})

//middlewares
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/form', function(req,res){
    
    let file = path.resolve('src','form.html')

    res.sendFile(file)

})

app.post('/form', function(req,res){
    
    res.send(req.body)
})


// http://localhost:3000
// http://dominio.com
app.listen(3000)
