"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var fs = require('fs');
var AbstractRepository = /** @class */ (function () {
    function AbstractRepository() {
        // Nombre del archivo donde se guardan las entidades
        this.table = '';
        var content = fs.readFileSync(this.table, { encoding: 'utf-8' });
        var items = JSON.parse(content);
        this.mapObjectToEntity(items);
    }
    AbstractRepository.prototype.setData = function (data) {
        //guardo en memoria
        this.data = data;
        //recibir los datos
        var string = JSON.stringify(data);
        //convertir los datos
        fs.writeFileSync(this.table, string);
        //guardar los datos
    };
    AbstractRepository.prototype.findAll = function () {
        return this.data;
    };
    AbstractRepository.prototype.findById = function (id) {
        return this.data.find(function (obj) {
            return obj.getId() == id;
        });
    };
    AbstractRepository.prototype.create = function (entity) {
        entity.setId(Date.now());
        this.setData(__spreadArray(__spreadArray([], this.data), [entity]));
        return entity;
    };
    AbstractRepository.prototype.update = function (entity) {
        if (entity.getId()) {
            this.data.map(function (obj) {
                if (obj.getId() == entity.getId()) {
                    return entity;
                }
                return obj;
            });
        }
        else {
            this.create(entity);
        }
        return true;
    };
    AbstractRepository.prototype["delete"] = function (id) {
        var count = this.data.length;
        var result = this.data.filter(function (obj) {
            return obj.getId() != id;
        });
        this.setData(result);
        return this.data.length < count;
    };
    return AbstractRepository;
}());
exports["default"] = AbstractRepository;
