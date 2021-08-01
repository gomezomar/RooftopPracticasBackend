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
    let index = products.findIndex(product => product.id == req.params.id)
    if(index == -1){
        return res.status(404).json({message:"not found"})
    }
    let oldProduct = products[index]
    let product = {
        ...products[index],
        ...req.body,
        id: oldProduct.id,
    }
    products[index] =  product
    let content = JSON.stringify(products)
    fs.writeFileSync('./products.json' , content)
    res.status(201).json({message: "success"})
})

app.delete('/products/:id', function(req,res){
    let content = fs.readFileSync('./products.json', {encoding: 'utf8'})
    let  products= JSON.parse(content) 
    let index = products.findIndex(product => product.id == req.params.id)
    if(index == -1){
        return res.status(404).json({message:"not found"})
    }
    products = products.filter( product => product.id != Number(req.params.id))    
    content = JSON.stringify(products)
    fs.writeFileSync('./products.json', content)
    res.status(201).json({message: "success"})
})

// example_1 http://localhost:3000
// example_2 http://dominio.com
app.listen(3000)
