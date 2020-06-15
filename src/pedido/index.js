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
    } else if(req.query.id){
        dao.obtenerDetalles(req.query.id).then(lista => {
            resultado = lista
            res.send(resultado)
        })

    }else{
        resultado = {
            "error": 400,
            "msg": "Parámetros inválidos."
        }
        res.send(resultado)  
    }                     
})

export default router