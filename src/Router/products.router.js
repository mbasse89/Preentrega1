import { Router } from "express"
import ProductManager from '../ProductManager/ProductManager.js'
import { uploader } from '../util.js'

const router = Router()  
const productManager = new ProductManager() 

// Ruta para obtener todos los productos o limitar la cantidad de resultados.
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query?.limit);
        const products = await productManager.getProducts(limit)
        res.send(products)
    } catch (err) {
        res.status(500).send("Error al obtener los productos: " + err)
    }
});

// Ruta para obtener un producto por su ID.
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const producto = await productManager.getProductById(id)
        res.send(producto)
    } catch (err) {
        res.status(500).send("Error al obtener el producto: " + err)
    }
});

// Ruta para agregar un nuevo producto.
router.post('/', uploader.single('thumbnail'), async (req, res) => {
    try {
        if (!req.file) {
            res.status(500).send("No subiste la imagen")
        }

        const data = req.body
        const filename = req.file.filename

        data.thumbnail = `http://localhost:8080/images/${filename}`

        const producto = await productManager.addProduct(data)

        res.send(producto)
    } catch (err) {
        res.status(500).send("Error al cargar el producto: " + err)
    }
});
 

// Ruta para actualizar un producto por su ID.
router.put('/:id', uploader.single('thumbnail'), async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const data = req.body

        if (req.file) {
            const filename = req.file.filename
            data.thumbnail = `http://localhost:8080/images/${filename}`
        }

        const producto = await productManager.updateProduct(id, data)

        res.send(producto)
    } catch (err) {
        res.status(500).send("Error al querer actualizar el producto: " + err)
    }
})

// Ruta para eliminar un producto por su ID.
router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const productEliminated = await productManager.deleteProduct(id)
        res.send(productEliminated);
    } catch (err) {
        res.status(500).send("Error al querer eliminar el producto: " + err)
    }
})

export default router 



