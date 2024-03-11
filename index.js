class ProductManager{
    //Atributos
    products;
    static id = 0;

    //Constructor
    constructor(){
        this.products = []
    }
    //Métodos
    addProduct(title,description,price,thumbnail,code,stock){
        if(!title || !description || !price || !thumbnail || !code || !stock){
        return 'Faltan campos'
        }

        const verificarCode = this.products.some(i => i.code == code)
        if(verificarCode){
            return `Ya existe un producto con el código ${code}`
        }
        

        ProductManager.id = ProductManager.id + 1
        const id = ProductManager.id
        

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
}

module.exports = ProductManager