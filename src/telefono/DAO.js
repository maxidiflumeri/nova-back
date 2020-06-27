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

async function agregarTelefono(idUsuario, telefono) {
    const conn = getConexion()
    let resultado = null
    if(validarTelefono(telefono)){
        telefono["id_usuario"] = idUsuario
        if(!await esDuplicado(telefono)){
            try {
                resultado = await conn.insert(telefono).into(tabla)
            }
            catch(error){
                console.log(error)
            }
        }
        else{
            console.log("Estado: " + msj.errorDuplicados().estado)
            console.log("Mesaje: " + msj.errorDuplicados().mensaje)
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
    try{
        existe = await conn.update(telefono).where('id_usuario', '=', idUsuario)
        .andWhere("telefono", "=", idTelefono).from(tabla)
        if (existe == 1) {
            resultado = msj.mensajeCustom(200, "Telefono modificado con exito")
        }
        else {
            resultado = msj.mensajeCustom(404, "telefono no encontrado")
        }
    }catch(error){
        console.log(error)
    }
    return resultado
}

/* ----------------------------
----------VALIDACIONES---------
------------------------------- */

function validarTelefono(telefono){
    const telefonoSchema = {
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
    agregarTelefono,
    eliminarTelefono,
    modificarTelefono
}