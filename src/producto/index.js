import dao from './DAO.js'
import express from 'express'
import _ from 'underscore'

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
    dao.agregarProducto(req.body).then(producto =>{
        resultado = producto
        res.send(resultado)
    })
})

export default router