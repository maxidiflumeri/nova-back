import dao from './DAO.js'
import express from 'express'
import msj from '../mensajes/mensajes.js'

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
    dao.agregarUsuario(req.body).then(lista =>{
        resultado = lista
        res.send(resultado)  
    })                         
})
export default router