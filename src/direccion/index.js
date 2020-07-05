//TOMAS MALENDEZ
import dao from './DAO.js'
import express from 'express'
import _ from 'underscore'
import msj from '../mensajes/mensajes.js'
import jwt from 'jsonwebtoken'
import tk from '../login/token.js'

const router = express.Router()

router.get('/', tk.verificarToken, (req, res) => {
    jwt.verify(req.token, 'claveSecreta', (error, authData) => {
        if(!error){
            let resultado = null   
            if(_.isEmpty(req.query)){  
                if(authData.user[0].ADMINISTRADOR == 'S'){         
                    dao.obtenerTodos().then(lista =>{
                        resultado = lista
                        res.send(resultado)  
                    })
                }
                else{
                    res.send(msj.mensajeRutaNoAutorizada(authData))
                }
            }    
            else if(req.query.idUsuario){
                if(authData.user[0].ADMINISTRADOR == 'S' || authData.user[0].ID_USUARIO == req.query.idUsuario){
                    dao.obtenerDireccionesPorUsuario(req.query.idUsuario).then(lista => {
                        resultado = lista
                        if(resultado.length == 0){
                            resultado = msj.mensajeSinResultados()
                        }
                        res.send(resultado)
                  })
                }
                else{
                    res.send(msj.mensajeRutaNoAutorizada(authData))
                }
            }
            else{
                resultado = msj.errorParams()
                res.send(resultado)  
            }
        }
        else{
            res.send(msj.mensajeRutaNoAutorizada(authData))
        }
    })                    
})

router.post('/', tk.verificarToken, (req, res) => {
    jwt.verify(req.token, 'claveSecreta', (error, authData) => {
        if(!error && (authData.user[0].ADMINISTRADOR == 'S' || req.body.id_usuario == authData.user[0].ID_USUARIO)){
            dao.agregarDireccion(req.body).then(direccion =>{
                res.send(direccion)  
            })
        }
        else{
            res.send(msj.mensajeRutaNoAutorizada(authData))
        }
    })                     
})

router.delete('/:idUsuario/:idDireccion', tk.verificarToken, (req, res) => { 
    jwt.verify(req.token, 'claveSecreta', (error, authData) => {
        if(!error && (authData.user[0].ADMINISTRADOR == 'S' || req.params.idUsuario == authData.user[0].ID_USUARIO)){
            dao.eliminarDireccion(req.params.idUsuario, req.params.idDireccion).then(direccion =>{
                res.send(direccion)  
            })
        }
        else{
            res.send(msj.mensajeRutaNoAutorizada(authData))
        }
    })                      
})

router.put('/:idUsuario/:idDireccion', tk.verificarToken, (req, res) => {
    jwt.verify(req.token, 'claveSecreta', (error, authData) => {
        if(!error && (authData.user[0].ADMINISTRADOR == 'S' || req.params.idUsuario == authData.user[0].ID_USUARIO)){
            dao.modificarDireccion(req.params.idUsuario, req.params.idDireccion, req.body).then(direccion => {
                res.send(direccion)
            })
        }
        else{
            res.send(msj.mensajeRutaNoAutorizada(authData))
        }
    })
})

export default router