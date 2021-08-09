import express from "express"
import { connect } from "http2";
import "reflect-metadata";
import { createConnection} from "typeorm"
import {Product} from './src/entity/product'

const app = express()
const connection =await createConnection()

app.get('/', function(req,res){
    res.send('/')

})

app.post('/products', function(req,res){
    let product = new Product
    
    product.title = 'Nuevo producto desde typeorm'
    product.stock =3
    product.price = 123.4
    product.description = "es LockNotSupportedOnGivenDriverError"
    product.isVisible = true
    product.brandId = 1
    
    Product.save().then(data=>{
        res.send(data)
    }).catch(err=>{

    })
})

app.get('/products', async function(req,res){
    let repository = await connection.getReository(Product)
    repository.find(req.query).then(data =>{
        res.send('/')
    }).catch(err=>{
        console.log(err)
        res.send({message: 'error'})
    })

})

app.get('/products/:id', async function(req,res){
    let repository = await connection.getReository(Product)
    repository.find(req.params.id).then(data =>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
        res.send({message: 'error'})
    })

})

app.patch('/products/:id', async function (req,res){
    let repository = await connection.getReository(Product)
    let product = await repository.findOne(req.params.id)
        product.price= req.body.price
        
    product.save().then(data =>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
        res.send({message: 'error'})
    })
})

app.delete('/products/:id', async function(req, res){
    let repository = await connection.getReository(Product)
    let product = await repository.findOne(req.params.id)
    
    repository.remove().then(()=>{
        res.send({message: 'delete'})
    }).catch(err => {
        console.log(err)
        res.send({message: 'error'})
    })
})


app.listen(3300)