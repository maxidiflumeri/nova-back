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
            else if(req.query.correo && req.query.clave){
                if(authData.user[0].ADMINISTRADOR == 'S'){
                    dao.obtenerUsuarioPorMailClave(req.query.correo, req.query.clave).then(lista => {
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

            else if(req.query.idUsuario){    
                if(authData.user[0].ADMINISTRADOR == 'S' || authData.user[0].ID_USUARIO == req.query.idUsuario){
                    dao.obtenerUsuarioPorId(req.query.idUsuario).then(lista => {
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
                console.log(req.query)
                resultado = msj.errorParams()
                res.send(resultado)  
            }
        }
        else{
            res.send(msj.tokenInvalido())
       }
    })    
})

router.post('/', (req, res) => {
    let resultado = null   
    dao.agregarUsuario(req.body).then(lista =>{
        resultado = lista
        res.send(resultado)  
    })                         
})

router.delete('/:id_usuario', tk.verificarToken, (req, res) => {
    jwt.verify(req.token, 'claveSecreta', (error, authData) => {
        if(!error && authData.user[0].ADMINISTRADOR == 'S'){
            dao.eliminarUsuario(req.params.id_usuario).then(usuario => {
                res.send(usuario)
            })
        }
        else{
            res.send(msj.mensajeRutaNoAutorizada(authData))
        }
    })
})

router.put('/:idUsuario', tk.verificarToken, (req, res) => {
    jwt.verify(req.token, 'claveSecreta', (error, authData) => {        
        if(!error){
            if(authData.user[0].ID_USUARIO == req.params.idUsuario){
                dao.modificarUsuario(req.params.idUsuario, req.body).then(usuario => {
                    res.send(usuario)
                })
            }
            else{
                res.send(msj.mensajeRutaNoAutorizada(authData))
            }
        }
        else{
             res.send(msj.tokenInvalido())
        }
    })
})

export default router