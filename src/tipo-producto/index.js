//DEV BY EZE LABORANTI
import dao from './DAO.js'
import express from 'express'
import _ from 'underscore'
import msj from '../mensajes/mensajes.js'

const router = express.Router()

router.get('/', (req, res) => {
    if (_.isEmpty(req.query)) {
        dao.obtenerTodos().then(lista => {
            res.send(lista)
        })
    } else if (req.query.id) {
        dao.obtenerPorId(req.query.id).then(tipo => {
            res.send(tipo)
        })
    } else if (req.query.descripcion) {
        dao.obtenerPorDescripcion(req.query.descripcion).then(tipo => {
            res.send(tipo)
        })
    }
    else {
        res.send(msj.errorParams())
    }
})

router.post('/', (req, res) => {
    dao.agregar(req.body).then(tipo =>{
        res.send(tipo)
    })
})

router.delete('/:id', (req, res) => {
    dao.eliminar(req.params.id).then(tipo => {
        res.send(tipo)
    })
})

router.put('/:id', (req, res) => {
    dao.modificar(req.params.id, req.body).then(tipo => {
        res.send(tipo)
    })
})

export default router