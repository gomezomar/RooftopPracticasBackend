const express = require('express')

const app= express()

const path = require('path')

const bodyParser = require('body-parser')

const products = require('./data')

//middlewares
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', function(req,res){
    
    res.json()

})

app.get('/products', function(req,res){
    console.log(req.query)
    res.json(products)

})

app.get('/products/:id', function(req,res){
    console.log(req.params)
    res.json()

})

app.post('/products', function(req,res){
    console.log(req.body)

    if(true){
       return res.status(403).json({message: "cannot post"})
    }

    res.json()

})

app.patch('/products/:id', function(req,res){
    
    res.json()

})

app.delete('/products/:id', function(req,res){
    
    res.json()

})
// http://localhost:3000
// http://dominio.com
app.listen(3000)
