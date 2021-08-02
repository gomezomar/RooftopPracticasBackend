import Entity from '../Entities/AbstractEntity'
import {PathLike, readFileSync,writeFileSync} from 'fs'


abstract class AbstractRepository{
    // Nombre del archivo donde se guardan las entidades
    protected table: PathLike = ''

    protected data : Entity[] 

    public constructor(){
        let content = readFileSync(this.table, {encoding: 'utf-8'})
        let items = JSON.parse(content)
        this.mapObjectToEntity(items)
    }
    abstract mapObjectToEntity(items);

    protected setData(data : Entity[]){
        //guardo en memoria
        this.data = data
        //recibir los datos
        let string = JSON.stringify(data)
        //convertir los datos
        writeFileSync(this.table, string)

        //guardar los datos
    }

    public findAll(){
        return this.data
    }

    public findById(id: Number): Entity{
      return  this.data.find(function(obj){
            return obj.getId() == id
        })
    }

    public create(entity: Entity): Entity{
        entity.setId(Date.now())
        this.setData([...this.data, entity])
        return entity
    }

    public update(entity: Entity): Boolean{

        if(entity.getId()){
            this.data.map(function(obj){
                if(obj.getId()== entity.getId()){
                    return entity
                }
                return obj
            })
        } else{
            this.create(entity)
        }
        return true
    }
    public delete(id: Number):Boolean{
        let count = this.data.length
        let result = this.data.filter(function(obj){
            return obj.getId() != id
        })
        this.setData(result)

        return this.data.length < count
    }
}

export default AbstractRepository