import Product from '../src/Entities/ProductEntity'
import ProductsRepository from '../src/Repositories/ProductsRepository'


let Repositorio = new ProductsRepository
let p = Repositorio.findById(1)
let todos = Repositorio.findAll()

console.log(p)
console.log(todos)
//puede isnstanciar el objeto producto
let producto = new Product

//llamar al metodo setId
producto.setId(123)
var resultado = producto.getId()
if(resultado == 123){
    console.info('La propiedad id devolvio el dato esperado')
}else{
    console.error('Se esperaba 123 y devolvio',+  resultado)
}


