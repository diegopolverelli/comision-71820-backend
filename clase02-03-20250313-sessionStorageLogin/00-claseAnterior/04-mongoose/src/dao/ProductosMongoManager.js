import { productosModelo } from "./models/productosModel.js"

export class ProductosMongoManager{


    static async get(){
        // let respuesta=productos
        return productosModelo.find().lean()
    }

    static async create(producto){    // {title:"algo", "price":8}
        // proceso de alta en persistencia
        let nuevoProducto=await productosModelo.create(producto)
        return nuevoProducto.toJSON()
    }
}


// let pm1=new ProductosManager()
// pm1.saludo()

// ProductosManager.code


