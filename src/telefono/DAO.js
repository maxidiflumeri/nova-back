import getConexion from '../../db/conexionDB.js'
import Joi from '@hapi/joi'
import msj from '../mensajes/mensajes.js'

const tabla = 'TELEFONOS'

/* ----------------------------
--------------CRUD-------------
------------------------------- */

async function obtenerTodos() {  
    const conn = getConexion()
    let lista = []
    try{        
        lista = await conn.select().from(tabla)
    }
    catch(error){
        console.log(error)
    }
    return lista  
}

async function obtenerTelefonosPorUsuario(idUsuario) {  
    const conn = getConexion()
    let lista = []
    try{         
        lista =  await conn.select().from(tabla).where('id_usuario','=',idUsuario)
    }
    catch(error){
        console.log(error)
    }
    return lista    
}

async function agregarTelefono(telefono) {
    const conn = getConexion()
    let resultado = null
    if(validarTelefono(telefono)){
        if(!await esDuplicado(telefono)){
            try {
                await conn.insert(telefono).into(tabla)
                resultado = msj.mensajePost()
            }
            catch(error){
                console.log(error)
            }
        }
        else{
            resultado = msj.errorDuplicados()
        }
    }
    else{
        resultado = msj.errorBody()
    }
    return resultado
}

async function eliminarTelefono(idUsuario, telefono){
    const conn = getConexion()
    let resultado = null
    let telefonoEliminado
    try{
        telefonoEliminado = await conn.del().where("id_usuario", "=", idUsuario)
        .andWhere("telefono", "=", telefono).from(tabla)
        if(telefonoEliminado < 1){
            resultado = msj.mensajeCustom(400, "Error al borrar telefono")
        }
        else{
            resultado = msj.mensajeDelete()
        }
    }
    catch(error){
        console.log(error)
    }
    return resultado
}

async function modificarTelefono(idUsuario, idTelefono, telefono){
    const conn = getConexion()
    let resultado = null
    let existe
    if(validarTelefono(telefono)){
        try{
            existe = await conn.update(telefono).where('id_usuario', '=', idUsuario)
            .andWhere("telefono", "=", idTelefono).from(tabla)
            if (existe == 1) {
                resultado = msj.mensajePut()
            }
            else {
                resultado = msj.errorNoEncontrado()
            }
        }catch(error){
            console.log(error)
        }
    }
    else{
        resultado = msj.errorBody()
    }
    return resultado
}

/* ----------------------------
----------VALIDACIONES---------
------------------------------- */

function validarTelefono(telefono){
    const telefonoSchema = {
        id_usuario: Joi.number().required(),
        telefono: Joi.number().required(),
        descripcion: Joi.string(),
    }
    const { error } = Joi.validate(telefono, telefonoSchema)
    if (error) {
        console.log('Error al validar telefono')
        return false        
    } 
    console.log('Telefono valido')
    return true
}

async function esDuplicado(telefono){
    const conn = getConexion()
    let esDuplicado = false
    let registro = null

    try {
        registro = await conn.select().from(tabla).where('id_usuario', '=', telefono.id_usuario)
        .andWhere('telefono', '=', telefono.telefono)
    }
    catch (error) {
        console.log(error)
    }

    if (registro.length > 0) {
        esDuplicado = true
    }
    return esDuplicado
}

export default{
    obtenerTodos,
    obtenerTelefonosPorUsuario,
    agregarTelefono,
    eliminarTelefono,
    modificarTelefono
}