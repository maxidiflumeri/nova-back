//DEV BY EZE LABORANTI
import dao from './DAO.js'
import express from 'express'
import _ from 'underscore'
import msj from '../mensajes/mensajes.js'
import jwt from 'jsonwebtoken'
import tk from '../login/token.js'

const router = express.Router()

router.get('/', tk.verificarToken, (req, res) => {
    jwt.verify(req.token, 'claveSecreta', (error, authData) => {
        if(!error && authData.user[0].ADMINISTRADOR == 'S'){
            console.log("error: " + error)            
            if (_.isEmpty(req.query)) {
                dao.obtenerTodos().then(lista => {
                    if (lista.length > 0)
                        res.send(lista)
                    else
                        res.send(msj.mensajeSinResultados())
                })
            } else if (req.query.id) {
                dao.obtenerPorId(req.query.id).then(tipo => {
                    if (tipo.length > 0)
                        res.send(tipo)
                    else
                        res.send(msj.mensajeSinResultados())
                })
            } else if (req.query.descripcion) {
                dao.obtenerPorDescripcion(req.query.descripcion).then(tipo => {
                    if (tipo.length > 0)
                        res.send(tipo)
                    else
                        res.send(msj.mensajeSinResultados())
                })
            }
            else {
                res.send(msj.errorParams())
            }
        }else{
            res.send(msj.mensajeRutaNoAutorizada(authData))        
        }
    })
})

router.post('/', tk.verificarToken, (req, res) => {
    jwt.verify(req.token, 'claveSecreta', (error, authData) => {
        if(!error && authData.user[0].ADMINISTRADOR == 'S'){           
            dao.agregar(req.body).then(tipo => {
                res.send(tipo)
            })
        }else{
            res.send(msj.mensajeRutaNoAutorizada(authData))
        }        
    })
})

router.delete('/:id', tk.verificarToken, (req, res) => {
    jwt.verify(req.token, 'claveSecreta', (error, authData) => {
        if(!error && authData.user[0].ADMINISTRADOR == 'S'){ 
            dao.eliminar(req.params.id).then(tipo => {
            res.send(tipo)
            })
        }else{
            res.send(msj.mensajeRutaNoAutorizada(authData))
        }
    })
})

router.put('/:id', tk.verificarToken, (req, res) => {
    jwt.verify(req.token, 'claveSecreta', (error, authData) => {        
        if(!error && authData.user[0].ADMINISTRADOR == 'S'){ 
            dao.modificar(req.params.id, req.body).then(tipo => {
            res.send(tipo)
            })
        }else{
            res.send(msj.mensajeRutaNoAutorizada(authData)) 
        }
    })
})

export default router