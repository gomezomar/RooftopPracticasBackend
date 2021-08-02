"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ProductEntity_1 = require("../Entities/ProductEntity");
var AbstractRepository_1 = require("../Repositories/AbstractRepository");
var fs = require('fs');
var ProductsRepository = /** @class */ (function (_super) {
    __extends(ProductsRepository, _super);
    function ProductsRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.table = '../../products.json';
        return _this;
    }
    ProductsRepository.prototype.mapObjectToEntity = function (items) {
        this.data = items.map(function (item) {
            var product = new ProductEntity_1["default"];
            product.setId(item.id);
            product.setTitle(item.title);
            product.setPrice(Number(item.price.replace('$', '')));
            return product;
        });
    };
    return ProductsRepository;
}(AbstractRepository_1["default"]));
exports["default"] = ProductsRepository;
