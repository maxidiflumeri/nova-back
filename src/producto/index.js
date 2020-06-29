
//DEV BY Castro Santiago

import dao from './DAO.js'
import express from 'express'
import _ from 'underscore'
import mensajes from '../mensajes/mensajes.js'

const router = express.Router()

// GET ProductosTotal
router.get('/', (req, res) => {
    let resultado = null
    if (_.isEmpty(req.query)) {
        dao.obtenerTodos().then(lista => {
            resultado = lista
            res.send(resultado)
        })
    }
    // GET ProductoPorIdProducto
    else if (req.query.id_producto) {
        dao.obtenerProductoPorId(req.query.id_producto).then(lista => {
            resultado = lista
            if(resultado.length>0)
            { 
                res.send(resultado)
            }
            else{
                res.send(mensajes.mensajeSinResultados())
            }
           
        })

    }
    // GET ProductoPorIdMarca
    else if (req.query.id_marca) {
        dao.obtenerProductoPorIdMarca(req.query.id_marca).then(lista => {
            resultado = lista
            if(resultado.length>0)
            { 
                res.send(resultado)
            }
            else{
                res.send(mensajes.mensajeSinResultados())
            }
        })

    }
    // GET ProductoPorIdTipo
    else if (req.query.id_tipo) {
        dao.obtenerProductoPorIdTipo(req.query.id_tipo).then(lista => {
            resultado = lista
            if(resultado.length>0)
            { 
                res.send(resultado)
            }
            else{
                res.send(mensajes.mensajeSinResultados())
            }
        })

    }
    // GET ProductoPorModelo
    else if (req.query.modelo) {
        dao.obtenerProductoPorModelo(req.query.modelo).then(lista => {
            resultado = lista
            if(resultado.length>0)
            { 
                res.send(resultado)
            }
            else{
                res.send(mensajes.mensajeSinResultados())
            }
        })

    }
    // GET ProductoPorDescripcion
    else if (req.query.descripcion) {
        dao.obtenerProductoPorDescripcion(req.query.descripcion).then(lista => {
            resultado = lista
            if(resultado.length>0)
            { 
                res.send(resultado)
            }
            else{
                res.send(mensajes.mensajeSinResultados())
            }
        })

    }

    else {
        resultado = mensajes.errorParams()
        res.send(resultado)
    }
})

// POST Producto
router.post('/', (req, res) => {
    let resultado = null
    dao.agregarProducto(req.body).then(producto => {
        resultado = producto
        res.send(resultado)
    })


})

// PUT Producto
router.put('/:id', (req, res) => {
    dao.modificarProducto(req.params.id,req.body).then(producto => {
        res.send(producto)
    })


})

// DELETE Producto
router.delete('/:id', (req, res) => {
    let resultado = null
    dao.eliminarProductoById(req.params.id).then(producto => {
        resultado = producto
        res.send(producto)
    })
})

export default router