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

router.post('/:idUsuario', (req, res) => {
    dao.agregarDireccion(req.params.idUsuario, req.body).then(direccion =>{
        res.send(direccion)  
    })                         
})

router.delete('/:idUsuario/:idDireccion', (req, res) => { 
    dao.eliminarDireccion(req.params.idUsuario, req.params.idDireccion).then(telefono =>{
        res.send(telefono)  
    })                         
})

router.put('/:idUsuario/:idDireccion', (req, res) => {
    dao.modificarDireccion(req.params.idUsuario, req.params.idDireccion, req.body).then(usuario => {
        res.send(usuario)
    })
})

export default router