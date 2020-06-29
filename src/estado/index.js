//DEV BY EZE LABORANTI
import dao from './DAO.js'
import express from 'express'
import _ from 'underscore'
import msj from '../mensajes/mensajes.js'

const router = express.Router()

router.get('/', (req, res) => {
    if (_.isEmpty(req.query)) {
        dao.obtenerTodos().then(lista => {
            if (lista.length > 0)
                res.send(lista)
            else
                res.send(msj.mensajeSinResultados())
        })
    } else if (req.query.id) {
        dao.obtenerPorId(req.query.id).then(estado => {
            if (estado.length > 0)
                res.send(estado)
            else
                res.send(msj.mensajeSinResultados())
        })
    } else if (req.query.descripcion) {
        dao.obtenerPorDescripcion(req.query.descripcion).then(estado => {
            if (estado.length > 0)
                res.send(estado)
            else
                res.send(msj.mensajeSinResultados())
        })
    }
    else {
        res.send(msj.errorParams())
    }
})

router.post('/', (req, res) => {
    dao.agregar(req.body).then(estado => {
        res.send(estado)
    })
})

router.delete('/:id', (req, res) => {
    dao.eliminar(req.params.id).then(estado => {
        res.send(estado)
    })
})

router.put('/:id', (req, res) => {
    dao.modificar(req.params.id, req.body).then(estado => {
        res.send(estado)
    })
})

export default router