"use strict";
exports.__esModule = true;
var ProductEntity_1 = require("../src/Entities/ProductEntity");
var ProductsRepository_1 = require("../src/Repositories/ProductsRepository");
var Repositorio = new ProductsRepository_1["default"];
var p = Repositorio.findById(1);
var todos = Repositorio.findAll();
console.log(p);
console.log(todos);
//puede isnstanciar el objeto producto
var producto = new ProductEntity_1["default"];
//llamar al metodo setId
producto.setId(123);
var resultado = producto.getId();
if (resultado == 123) {
    console.info('La propiedad id devolvio el dato esperado');
}
else {
    console.error('Se esperaba 123 y devolvio', +resultado);
}
