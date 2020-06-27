import dao from './DAO.js'
import express from 'express'
import _ from 'underscore'
import mensajes from '../mensajes/mensajes.js'

const router = express.Router()

router.get('/', (req, res) => {
    let resultado = null
    if (_.isEmpty(req.query)) {
        dao.obtenerTodos().then(lista => {
            resultado = lista
            res.send(resultado)
        })
    }

    else if (req.query.id_producto) {
        dao.obtenerProductoPorId(req.query.id_producto).then(lista => {
            resultado = lista
            res.send(resultado)
        })

    }

    else if (req.query.id_marca) {
        dao.obtenerProductoPorIdMarca(req.query.id_marca).then(lista => {
            resultado = lista
            res.send(resultado)
        })

    }

    else if (req.query.id_tipo) {
        dao.obtenerProductoPorIdTipo(req.query.id_tipo).then(lista => {
            resultado = lista
            res.send(resultado)
        })

    }

    else if (req.query.modelo) {
        dao.obtenerProductoPorModelo(req.query.modelo).then(lista => {
            resultado = lista
            res.send(resultado)
        })

    }

    else if (req.query.descripcion) {
        dao.obtenerProductoPorDescripcion(req.query.descripcion).then(lista => {
            resultado = lista
            res.send(resultado)
        })

    }

    else {
        resultado = mensajes.errorParams()
        res.send(resultado)
    }
})

router.post('/', (req, res) => {
    let resultado = null
    dao.agregarProducto(req.body).then(producto => {
        resultado = producto
        res.send(resultado)
    })


})

router.delete('/:id', (req, res) => {
    let resultado = null
    dao.eliminarProductoById(req.params.id).then(producto => {
        res.send(producto)
    })
})

export default router