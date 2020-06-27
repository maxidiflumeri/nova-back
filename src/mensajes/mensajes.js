
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
    mensajePost,
    mensajePut,
    mensajeDelete,
    mensajeCustom    
}