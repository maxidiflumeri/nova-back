//DEV BY EZE LABORANTI
import dao from './DAO.js'
import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    dao.obtenerTodos().then(lista =>{
        res.send(lista)  
    })                         
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

export default router