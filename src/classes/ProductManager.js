import fs from "fs"

export default class ProductManager{
    //Atributos
    products = [];
    path;

    //Constructor
    constructor(path){
        this.path = path;
        this.products = this.#leerArchivo()
    }

    //Métodos
    #idGenerator(){
        let id = 1
        if(this.products.length !== 0)
        id= this.products[this.products.length-1].id+ 1
        return id
    }


    #leerArchivo(){
        console.log(this.path)
        try {
            if(fs.existsSync(this.path)){
                return JSON.parse(fs.readFileSync(this.path, 'utf-8'))
            } else{
                return "Error al leer archivo"
            }
        } catch (error) {
            console.log(error.message) 
        }
        return []
    }

    #guardarDatos(){
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products))
        } catch (error) {
            console.log(error.message)
        }
    }

    async getProducts(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
        } else {
            return []
        }
    }

    async addProduct(title,description,price,thumbnail,code,stock){
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
        await this.#guardarDatos()
        return "Producto agregado"
    }

    async getProductsByID(id){
        let productos=await this.#leerArchivo()
        let producto=productos.find(prod =>prod .id===id)
        return producto
    }


    async updateProduct(id, propiedad){
        const i = this.products.findIndex(p=> p.id === id)
        if(i !== -1){
            const {id, ...rest} = propiedad
            this.products[i] = {...this.products[i], ...rest}
            await this.#guardarDatos
            return 'El producto fue actualizado correctamente'
        }
    }


    async deleteProduct(id){
        const i = this.products.findIndex(p=> p.id === id)
        if(i !== -1){
            this.products = this.products.filter(p=>p.id !== id)
            await this.#guardarDatos()
            return (`Producto eliminado correctamente!`)
        }
        return (`No existe el producto ${id}`)
    }
}
