import jwt from 'jsonwebtoken'
import usuarios from '../usuario/DAO.js'
import msj from '../mensajes/mensajes.js'

app.post("/api/login", (req, res) => {    
    const user = usuarios.buscarUsuarioLogin(req.body.usuario, req.body.password)
    if (user){
        jwt.sign({user}, 'claveSecreta', (err, token) =>{
            res.send({
                token                
            })
        })       
    }else{
        res.send(msj.mensajeFallaLogin())
    }
})