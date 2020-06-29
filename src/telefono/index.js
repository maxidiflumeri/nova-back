import dao from './DAO.js'
import express from 'express'
import _ from 'underscore'
import msj from '../mensajes/mensajes.js'

const router = express.Router()

router.get('/', (req, res) => {
    let resultado = null   
    if(_.isEmpty(req.query)){           
        dao.obtenerTodos().then(lista =>{
            resultado = lista
            res.send(resultado)  
        }) 
    }    
    else if(req.query.idUsuario){
        dao.obtenerTelefonosPorUsuario(req.query.idUsuario).then(lista => {
            resultado = lista
            if(resultado.length == 0){
                resultado = msj.mensajeSinResultados()
            }
            res.send(resultado)
        })
    }
    else{
        resultado = msj.errorParams()
        res.send(resultado)  
    }                      
})

router.post('/', (req, res) => {
    dao.agregarTelefono(req.body).then(telefono =>{
        res.send(telefono)  
    })                         
})

router.delete('/:idUsuario/:telefono', (req, res) => {
    dao.eliminarTelefono(req.params.idUsuario, req.params.telefono).then(telefono =>{
        res.send(telefono)  
    })                         
})

router.put('/:idUsuario/:idTelefono', (req, res) => {
    dao.modificarTelefono(req.params.idUsuario, req.params.idTelefono, req.body).then(telefono => {
        res.send(telefono)
    })
})

export default router