//DEV BY EZE LABORANTI
import dao from './DAO.js'
import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    dao.obtenerTodos().then(lista => {
        res.send(lista)
    })
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