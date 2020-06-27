import dao from './DAO.js'
import express from 'express'

const router = express.Router()

router.get('/:idUsuario', (req, res) => {
    let resultado = null   
    if(!idUsuario){
        dao.obtenerTodos().then(lista =>{
            resultado = lista
            res.send(resultado)  
        }) 
    }
    else{
        dao.obtenerTodos().then(lista =>{
            resultado = lista
            res.send(resultado)  
        })
    }                       
})

router.post('/:idUsuario', (req, res) => {
    dao.agregarTelefono(req.params.idUsuario, req.body).then(telefono =>{
        res.send(telefono)  
    })                         
})

router.delete('/:idUsuario/:telefono', (req, res) => {
    console.log(req.params.idUsuario)   
    console.log(req.params.telefono)   
    dao.eliminarTelefono(req.params.idUsuario, req.params.telefono).then(telefono =>{
        res.send(telefono)  
    })                         
})

router.put('/:idUsuario/:idTelefono', (req, res) => {
    dao.modificarTelefono(req.params.idUsuario, req.params.idTelefono, req.body).then(usuario => {
        res.send(usuario)
    })
})

export default router