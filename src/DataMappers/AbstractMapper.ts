import Entity from "../Entities/AbstractEntity";

abstract class AbstractMapper {
// dispone metodo que va a recibir un metodo cualquiera y lo convierte en instancia de entidad
    abstract mapObjectToEntity(obj : object): Entity;
}

export default AbstractMapper