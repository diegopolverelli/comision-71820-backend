import { productos } from "../data/productos.js";

export class ProductosManager{
    static code=123

    saludo(){
        return "hola"
    }

    static get(){
        let respuesta=productos
        return respuesta
    }

    static create(producto){    // {title:"algo", "price":8}
        // proceso de alta en persistencia
        let id=1
        if(productos.length>0){
            id=Math.max(...productos.map(d=>d.id))+1
        }
        
        let nuevoProducto={
            id, ...producto
        }

        productos.push(nuevoProducto)
        return nuevoProducto
    }
}


// let pm1=new ProductosManager()
// pm1.saludo()

// ProductosManager.code
