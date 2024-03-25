import express from "express"
import ProductManager from "./classes/ProductManager.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pathRoute = path.join(__dirname, '/data/productos.json')


const port = 8080
const app = express()
const productManager = new ProductManager(pathRoute)


app.get("/", async (req, res)=>{
    res.json({message: "Hola"})
})

app.get("/productos", async (req, res)=>{
    const productos = await productManager.getProducts()
    let {limit}=req.query
    if (limit) {
        res.json(productos.slice(0, limit))
    } else {
        res.json(productos)
    }
})

app.get("/productos/:id", async (req, res)=>{
    let id = req.params.id
    id = Number(id)

    if(isNaN(id)){

        return res.json({error: "Solo IDs numericos"})
    }
    try {
        let producto = await productManager.getProductsByID(id)
        if(!producto){
            return res.json({message: `No existe el producto con ID ${id}`})
        }
        return res.json(producto)
    } catch (error) {
        console.log({error : `${error}`})
    }
})

app.listen(port, ()=>{
    console.log(`Server funcionando en puerto ${port}`)
})