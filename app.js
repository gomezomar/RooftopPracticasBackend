const express = require('express')

const app= express()

const path = require('path')

const fs = require('fs')

const bodyParser = require('body-parser')

const products = require('./products')

//middlewares
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', function(req,res){
    
    res.json()

})
// example http://localhost:3000/products?page=1&price_min=100&price_max=1000
app.get('/products', function(req,res){
    let results=[...products]
    if(Object.keys(req.query).length >0){
        if (req.query.price_min){
            results =results.filter(function(product) {
                return Number(product.price.replace('$',''))>= req.query.price_min
            })
        }
        if (req.query.price_max){
            results =results.filter(function(product) {
                return Number(product.price.replace('$',''))<= req.query.price_max
            })
        }    
    }else{
        results = products.slice(0,10)
    }
    if (req.query.hasOwnProperty('page')) {
        if (req.query.page) {
            if(req.query.page > 0){
                ni=req.query.page*10
                nf=ni+10
                results = results.slice(ni,nf)
            }    
        }
    }
    res.json(results)
})

app.get('/products/:id', function(req,res){
    let product = products.find(function(product) {
        return product.id == req.params.id
    })
    if (product) {
        return res.json(product)  
    }else{
        res.status(404).json({message:"this product does not exist"})
    }
})

app.post('/products', function(req,res){
    let newProduct ={
        id: Date.now(),
        description:'',
        is_visible: false,
        ...req.body
    }
    let content =fs.readFileSync('./products.json', {encoding: 'utf8'})
    let json = JSON.parse(content)
    json.push(newProduct)
    content= JSON.stringify(json)
    fs.writeFileSync('./products.json', content)
    res.status(201).json({message: "created", "id" :newProduct.id})
})

app.patch('/products/:id', function(req,res){
    let product = products.find(function(product) {
        return product.id == req.params.id
    }) 
    if (product) {
        let patchProduct ={
            id: req.params.id,
            description:'',
            is_visible: false,
            ...req.body
        }
        let content =fs.readFileSync('./products.json', {encoding: 'utf8'})
        let json = JSON.parse(content)
        let patch = products.indexOf(product)
        json[patch] = patchProduct
        content = JSON.stringify(json)
        fs.writeFileSync('./products.json', content)
        return res.status(201).json({message: "edited", "id" :patchProduct.id})
    }else{
        res.status(404).json({message:"this product does not exist"})
    }
})

app.delete('/products/:id', function(req,res){
    let product = products.find(function(product) {
        return product.id == req.params.id
    }) 
    if (product) {
        let content =fs.readFileSync('./products.json', {encoding: 'utf8'})
        let json = JSON.parse(content)
        let patch = products.indexOf(product)
        json.splice(patch,1)
        content = JSON.stringify(json)
        fs.writeFileSync('./products.json', content)
        return res.status(201).json({message: "deletd", products})
    }else{
        res.status(404).json({message:"this product does not exist"})
    }
})

// example_1 http://localhost:3000
// example_2 http://dominio.com
app.listen(3000)
