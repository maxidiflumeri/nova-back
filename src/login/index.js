import jwt from 'jsonwebtoken'
import usuarios from '../usuario/DAO.js'
import msj from '../mensajes/mensajes.js'
import express from 'express'

const router = express.Router()

router.post("/", (req, res) => {    
    usuarios.obtenerUsuarioPorMailClave(req.body.usuario, req.body.password).then(user =>{
        if (user.length > 0){
            jwt.sign({user}, 'claveSecreta', (err, token) =>{
                res.send({
                    token                
                })
            })       
        }else{
            res.send(msj.mensajeFallaLogin())
        }
    }).catch(error =>{
        console.log(error)
    })
})

export default router