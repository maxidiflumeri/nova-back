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
        dao.obtenerUsuarioPorId(req.query.idUsuario).then(lista => {
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