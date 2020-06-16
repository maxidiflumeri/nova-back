import dao from './DAO.js'
import express from 'express'
import _ from 'underscore'

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
            res.send(resultado)
        })

    } else if(req.query.idPedido){
        dao.obtenerPedidoPorId(req.query.idPedido).then(lista => {
            resultado = lista
            res.send(resultado)
        })

    } else if(req.query.idUsuario){
        dao.obtenerPedidosPorUsuario(req.query.idUsuario).then(lista => {
            resultado = lista
            res.send(resultado)
        })

    } else{
        resultado = {
            "error": 400,
            "msg": "Parámetros inválidos."
        }
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

export default router