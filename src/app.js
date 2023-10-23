import express from 'express';

import routerProducts from './Router/products.router.js'
import routerCarts from './Router/carts.router.js'

const PORT = 8080;
const app = express();

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());
// Middleware para analizar los datos del formulario en las solicitudes
app.use(express.urlencoded({ extended: true }));
// Middleware para servir archivos estáticos desde la carpeta './src/public'
app.use(express.static('./src/public'));

// Configurar rutas para los recursos 'products' y 'carts' usando los enrutadores importados
app.use('/api/products', routerProducts); // Las solicitudes a '/api/products' se gestionan mediante el enrutador de productos
app.use('/api/carts', routerCarts); // Las solicitudes a '/api/carts' se gestionan mediante el enrutador de carritos

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
