import express from 'express'
import router from './router.js'

const main = () =>{
    const app = express()

    app.use(express.json())
    app.use('/api/estados', router.estado)
    app.use('/api/marcas', router.marca)
    app.use('/api/pedidos', router.pedido)
    app.use('/api/productos', router.producto)
    app.use('/api/tiposProducto', router.tipoProducto)
    app.use('/api/usuarios', router.usuario)

    return app

}

export default main