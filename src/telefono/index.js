//TOMAS MELENDEZ
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
                    dao.obtenerTelefonosPorUsuario(req.query.idUsuario).then(lista => {
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
            res.send(msj.tokenInvalido())
       }
    })              
})

router.post('/', tk.verificarToken, (req, res) => {
    jwt.verify(req.token, 'claveSecreta', (error, authData) => {
        if(!error && (authData.user[0].ADMINISTRADOR == 'S' || req.body.id_usuario == authData.user[0].ID_USUARIO)){
            dao.agregarTelefono(req.body).then(telefono =>{
                res.send(telefono)
            })
        }
        else{
            res.send(msj.mensajeRutaNoAutorizada(authData))
        }
    })                
})

router.delete('/:idUsuario/:telefono', tk.verificarToken, (req, res) => {
    jwt.verify(req.token, 'claveSecreta', (error, authData) => {
        if(!error && (authData.user[0].ADMINISTRADOR == 'S' || req.params.idUsuario == authData.user[0].ID_USUARIO)){
            dao.eliminarTelefono(req.params.idUsuario, req.params.telefono).then(telefono =>{
                res.send(telefono)
            })
        }
        else{
            res.send(msj.mensajeRutaNoAutorizada(authData))
        }
          
    })                         
})

router.put('/:idUsuario/:idTelefono', tk.verificarToken, (req, res) => {
    jwt.verify(req.token, 'claveSecreta', (error, authData) => {
        if(!error && (authData.user[0].ADMINISTRADOR == 'S' || req.params.idUsuario == authData.user[0].ID_USUARIO)){
            dao.modificarTelefono(req.params.idUsuario, req.params.idTelefono, req.body).then(telefono => {
                res.send(telefono)
            })
        }
        else{
            res.send(msj.mensajeRutaNoAutorizada(authData))
        }
    })
})

export default router