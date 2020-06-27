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

router.delete('/:id_usuario', (req, res) => {
    dao.eliminarUsuario(req.params.id_usuario).then(usuario => {
        res.send(usuario)
    })
})

router.put('/:idUsuario', (req, res) => {
    dao.modificarUsuario(req.params.idUsuario, req.body).then(usuario => {
        res.send(usuario)
    })


})

export default router