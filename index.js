const fs = require("fs")


class ProductManager{
    //Atributos
    products;
    path;

    //Constructor
    constructor(){
        this.products = this.#leerArchivo()
        this.path = './archivos/productos.txt'
    }

    //Métodos
    #idGenerator(){
        let id = 1
        if(this.products.length !== 0)
        id= this.products[this.products.length-1].id+ 1
        return id
    }


    #leerArchivo(){
        try {
            if(fs.existsSync(this.path))
            return JSON.parse(fs.readFileSync(this.path, 'utf-8'))
            return []
        } catch (error) {
            console.log(error.message) 
        }
    }

    #guardarDatos(){
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products))
        } catch (error) {
            console.log(error.message)
        }
    }


    addProduct(title,description,price,thumbnail,code,stock){
        if(!title || !description || !price || !thumbnail || !code || !stock){
        return 'Faltan campos'
        }

        const verificarCode = this.products.some(i => i.code == code)
        if(verificarCode){
            return `Ya existe un producto con el código ${code}`
        }
        

        ProductManager.id = ProductManager.id + 1
        const id = this.#idGenerator()
        

        const nuevoProducto = {
            id: id,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code:code,
            stock: stock
        }
        this.products.push(nuevoProducto)
        this.#guardarDatos()
        return "Producto agregado"
    }
    getProducts(){
        return this.products
    }
    getProductsByID(id){
        const i = this.products.find(i => i.id === id)
        if (i){
            return i
        } else{
            return "No se encontró el producto :("
        }
    }
    updateProduct(id, propiedad){
        const i = this.products.findIndex(p=> p.id === id)
        if(i !== -1){
            const {id, ...rest} = propiedad
            this.products[i] = {...this.products[i], ...rest}
            this.#guardarDatos
            return 'El producto fue actualizado correctamente'
        }
    }


    deleteProduct(id){
        const i = this.products.findIndex(p=> p.id === id)
        if(i !== -1){
            this.products = this.products.filter(p=>p.id !== id)
            this.#guardarDatos()
            return (`Producto eliminado correctamente!`)
        }
        return (`No existe el producto ${id}`)
    }
}

module.exports = ProductManager