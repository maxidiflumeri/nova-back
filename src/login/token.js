import msj from '../mensajes/mensajes.js'

function verificarToken(req, res, next){    
    const bearerHeader = req.headers['authorization']    

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    }else{
        res.send(msj.tokenInexistente()) 
    }
}

export default{
    verificarToken
}