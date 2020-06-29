// DEV BY MAXIMILIANO ARIEL DI FLUMERI

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
    } else if(req.query.idDetalle){
        dao.obtenerDetalles(req.query.idDetalle).then(lista => {
            resultado = lista
            if(resultado.length > 0){
                res.send(resultado)
            }else{
                res.send(msj.mensajeSinResultados())
            }
            
        })

    } else if(req.query.idPedido){
        dao.obtenerPedidoPorId(req.query.idPedido).then(lista => {
            resultado = lista
            if(resultado.length > 0)
                res.send(resultado)
            else{
                res.send(msj.mensajeSinResultados())
            }
        })

    } else if(req.query.idUsuario){
        dao.obtenerPedidosPorUsuario(req.query.idUsuario).then(lista => {
            resultado = lista
            if(resultado.length > 0){
                res.send(resultado)
            }else{
                res.send(msj.mensajeSinResultados())
            }           
        })

    } else{
        resultado = msj.errorParams()
        res.send(resultado)  
    }                     
})

router.post('/', (req, res) => {
    let resultado = null
    dao.agregarPedido(req.body).then(pedido =>{
        resultado = pedido
        res.send(resultado)
    })
})

router.put('/:id', (req, res) =>{
    dao.modificarPedido(req.params.id, req.body).then(pedido => {
        res.send(pedido)
    })
})

router.delete('/:id', (req, res) => {
    dao.eliminarPedido(req.params.id).then(pedido => {
        res.send(pedido)
    })
})

export default router