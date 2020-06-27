import getConexion from '../../db/conexionDB.js'
import Joi from '@hapi/joi'
import msj from '../mensajes/mensajes.js'

const tabla= 'DIRECCIONES'

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

async function obtenerDireccionesPorUsuario(idUsuario) {  
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

async function agregarDireccion(idUsuario, direccion) {
    const conn = getConexion()
    let resultado = null
    if(validarDireccion(direccion)){
        direccion["id_usuario"] = idUsuario
        if(!await esDuplicado(direccion)){
            try {
                resultado = await conn.insert(direccion).into(tabla)
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

async function eliminarDireccion(idUsuario, idDireccion){
    const conn = getConexion()
    let resultado = null
    let direccionEliminada
    try{
        direccionEliminada = await conn.del().where("id_usuario", "=", idUsuario)
        .andWhere("id_direccion", "=", idDireccion).from(tabla)
        if(direccionEliminada < 1){
            resultado = msj.mensajeCustom(400, "Error al borrar direccion")
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

async function modificarDireccion(idUsuario, idDireccion, direccion){
    const conn = getConexion()
    let resultado = null
    let existe
    try{
        existe = await conn.update(direccion).where('id_usuario', '=', idUsuario)
        .andWhere("id_direccion", "=", idDireccion).from(tabla)
        if (existe == 1) {
            resultado = msj.mensajeCustom(200, "Modificado con exito")
        }
        else {
            resultado = msj.mensajeCustom(404, "direccion no encontrada")
        }
    }catch(error){
        console.log(error)
    }
    return resultado
}

/* ----------------------------
----------VALIDACIONES---------
------------------------------- */

function validarDireccion(direccion){
    const direccionSchema = {
        id_direccion: Joi.number().required(),
        calle: Joi.string().required(),
        numero: Joi.number().required(),
        piso: Joi.number(),
        departamento: Joi.string(),
        cp: Joi.string().required(),
        provincia: Joi.string().required(),
        localidad: Joi.string().required()
    }
    
    const { error } = Joi.validate(direccion, direccionSchema)
    if (error) {
        console.log('error al validar direccion')
        return false        
    } 
    
    console.log('Direccion valida')
    return true
}

async function esDuplicado(direccion) {
    const conn = getConexion()
    let esDuplicado = false
    let registro = null

    try {
        registro = await conn.select().from(tabla).where('id_usuario', '=', direccion.id_usuario)
        .andWhere('id_direccion', '=', direccion.id_direccion)
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
    obtenerDireccionesPorUsuario,
    agregarDireccion,
    eliminarDireccion, 
    modificarDireccion
}