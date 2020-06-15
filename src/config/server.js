import express from 'express'
import router from './router.js'

const main = () =>{
    const app = express()

    app.use(express.json())
    app.use('/api/estado', router.estado)
    app.use('/api/marca', router.marca)
    app.use('/api/pedido', router.pedido)
    app.use('/api/producto', router.producto)
    app.use('/api/tipoProducto', router.tipoProducto)
    app.use('/api/usuario', router.usuario)

    return app

}

export default main