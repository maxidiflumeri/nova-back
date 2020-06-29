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
        dao.obtenerDireccionesPorUsuario(req.query.idUsuario).then(lista => {
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
    dao.agregarDireccion(req.body).then(direccion =>{
        res.send(direccion)  
    })                         
})

router.delete('/:idUsuario/:idDireccion', (req, res) => { 
    dao.eliminarDireccion(req.params.idUsuario, req.params.idDireccion).then(direccion =>{
        res.send(direccion)  
    })                         
})

router.put('/:idUsuario/:idDireccion', (req, res) => {
    dao.modificarDireccion(req.params.idUsuario, req.params.idDireccion, req.body).then(direccion => {
        res.send(direccion)
    })
})

export default router