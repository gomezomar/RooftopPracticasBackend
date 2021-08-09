import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "products"})

export class Product {
    
    @PrimaryGeneratedColumn({name: "products"})
    id:Number

    @Column({
        length: 200
    })
    title: String

    @Column()
    price: Number
    
    @Column()
    stock: Number

    @Column()
    description: String

    @Column({name :"is_visible"})
    isVisible: Boolean

    @Column({name :"brand_id"})
    brandId: Number

    @Column({name: "created_at"})
    createdAt : Date

    @Column({name: "updated_at"})
    updatedAt : Date

    @Column({name: "deleted_at"})
    deletedAt : Date

}