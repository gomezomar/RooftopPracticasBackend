import Product from "../Entities/ProductEntity";

import AbstractMapper from "./AbstractMapper";

class ProductMapper extends AbstractMapper {
    public mapObjectToEntity(obj : object): Product{
        let product = new Product

        product.setId(obj.id)
        product.setTitle(obj.title)
       
        return product
    }

}

export default ProductMapper