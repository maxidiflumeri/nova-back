import dao from './DAO.js'
import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    let resultado = null   
    dao.obtenerTodos().then(lista =>{
        resultado = lista
        res.send(resultado)  
    })                         
})

router.post('/', (req, res) => {
    let resultado = null
    dao.agregar(req.body).then(pedido =>{
        resultado = pedido
        res.send(resultado)
    })
})

export default router