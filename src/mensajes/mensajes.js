function errorBody(){
    return {
        "estado": 400,
        "mensaje": "Body incorrecto."
    }
}

function errorParams(){
    return{
        "estado": 400,
        "mensaje": "Parámetros incorrectos"
    }
}

function errorDuplicados(){
    return{
        "estado": 400,
        "mensaje": "Claves duplicadas"
    }
}

function errorNoEncontrado(){
    return{
        "estado": 404,
        "mensaje": "No se encontró el elemento"
    }
}

function mensajePost(){
    return{
        "estado": 200,
        "mensaje": "Post Exitoso"
    }
}

function mensajePut(){
    return{
        "estado": 200,
        "mensaje": "Put Exitoso"
    }
}

function mensajeDelete(){
    return{
        "estado": 200,
        "mensaje": "Delete Exitoso"
    }
}

function mensajeSinResultados(){
    return{
        "estado": 200,
        "mensaje": "No se encontraron resultados"
    }
}

function mensajeFallaLogin(){
    return{
        "estado": 200,
        "mensaje": "Usuario o clave incorrecta."
    }
}

function mensajeRutaNoAutorizada(authData) {
    return{
        "estado": 403,
        "mensaje": "Usuario no autorizado para acceder a esta ruta",
        "authData": authData
    }    
}

function tokenInexistente(){
    return{
        "estado": 403,
        "mensaje": "Token Inexistente."
    }
}

function tokenInvalido(){
    return{
        "estado": 403,
        "mensaje": "Token inválido."
    }
}

function mensajeCustom(estado, mensaje){
    return{
        "estado": estado,
        "mensaje": mensaje
    }
}



export default {    
    errorBody,
    errorParams,
    errorDuplicados,
    errorNoEncontrado,
    mensajePost,
    mensajePut,
    mensajeDelete,
    mensajeSinResultados,
    mensajeCustom,
    mensajeFallaLogin,
    mensajeRutaNoAutorizada,
    tokenInvalido,
    tokenInexistente    
}
