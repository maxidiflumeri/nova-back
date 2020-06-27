import getConexion from '../../db/conexionDB.js'
import Joi from '@hapi/joi'
import msj from '../mensajes/mensajes.js'


const tabla = 'USUARIOS'
const tablaTel = 'TELEFONOS'
const tablaDir = 'DIRECCIONES'

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

async function obtenerUsuarioPorId(id) {  
    const conn = getConexion()
    let lista = []
    try{         
        lista =  await conn.select().from(tabla).where('id_usuario','=',id)
    }
    catch(error){
        console.log(error)
    }
    return lista    
}

async function agregarUsuario(usuario){
    const conn = getConexion()
    let resultado = null
    const usuarioFin = separarUsuario(usuario)
    const telefonos = separarTelefonos(usuario)
    const direccion = separarDireccion(usuario)
    if(validarUsuario(usuarioFin) && validarTelefonos(telefonos) && validarDireccion(direccion)){
        if(!await esDuplicado(usuarioFin)){
            try{            
                resultado = await conn.insert(usuarioFin).into(tabla)
                const usuarioNew = await conn.max({ id_usuario: 'id_usuario' }).from(tabla).where('id_usuario','=',usuarioFin.id_usuario)
                const idUsuario = usuarioNew[0].id_usuario
                for (let i = 0; i < telefonos.length; i++) {
                    telefonos[i]["id_usuario"] = idUsuario
                    await conn.insert(telefonos[i]).into(tablaTel)
                }

                await conn.insert(direccion).into(tablaDir)

            }
            catch(error){
                console.log(error)
            }
        }
        else{
            console.log("Estado: " + msj.errorDuplicados().estado)
            console.log("Mesaje: " + msj.errorDuplicados().mensaje)
        }
    }else{
        resultado = msj.errorBody()
    }

    return resultado
}

async function eliminarUsuario(idUsuario){
    const conn = getConexion()
    let resultado = null
    let uEliminado
    let tEliminados
    let dElimanadas
    try{
        tEliminados = await conn.del().where("id_usuario", "=", idUsuario).from(tablaTel)
        dElimanadas = await conn.del().where("id_usuario", "=", idUsuario).from(tablaDir)
        uEliminado = await conn.del().where("id_usuario", "=", idUsuario).from(tabla)
        if(tEliminados < 1){
            resultado = msj.mensajeCustom(400, "Error al borrar telefonos")
        }
        else if(dElimanadas < 1){
            resultado = msj.mensajeCustom(400, "Error al borrar direcciones")
        }
        else if(uEliminado < 1){
            resultado = msj.mensajeCustom(400, "Intenta borrar un usuario inexistente")
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

async function modificarUsuario(id_usuario, usuario){
    const conn = getConexion()
    let resultado = null
    let existe
    try{
        existe = await conn.update(usuario).where('id_usuario', '=', id_usuario).from(tabla)
        if (existe == 1) {
            resultado = msj.mensajePut()
        }
        else {
            resultado = msj.errorNoEncontrado()
        }
    }catch(error){
        console.log(error)
    }
    return resultado
}

/* ----------------------------
-----------SEPARADORES---------
------------------------------- */

function separarUsuario(usuario) {
    const usuarioFin = {
        "id_usuario" : usuario.id_usuario,
        "nombre" : usuario.nombre,         
        "apellido" : usuario.apellido,
        "correo" : usuario.correo,
        "clave" : usuario.clave,
        "administrador" : usuario.administrador,
        "fecha_nacimiento" : usuario.fecha_nacimiento,
        "sexo" : usuario.sexo
    }
    return usuarioFin
}

function separarTelefonos(usuario) {
    const listaTelefonos = []
    for (let i = 0; i < usuario.telefonos.length; i++) { 
        const nroTel = {
            "telefono": usuario.telefonos[i].telefono,
            "descripcion": usuario.telefonos[i].descripcion
        }
        listaTelefonos.push(nroTel)         
    }
    return listaTelefonos
}

function separarDireccion(usuario){
    const direccion = {
        "id_direccion": usuario.direccion.id_direccion,
        "id_usuario": usuario.direccion.id_usuario,
        "calle": usuario.direccion.calle,
        "numero": usuario.direccion.numero,
        "piso": usuario.direccion.piso,
        "departamento": usuario.direccion.departamento,
        "cp": usuario.direccion.cp,
        "provincia": usuario.direccion.provincia,
        "localidad": usuario.direccion.localidad
    }  
    return direccion
}

/* ----------------------------
-----------VALIDADORES---------
------------------------------- */

function validarUsuario(usuario) {
    const usuarioSchema = {
        id_usuario: Joi.number().required(),
        nombre: Joi.string().required(),         
        apellido: Joi.string().required(),
        correo: Joi.string().email().required(),
        clave: Joi.string().required(),
        administrador: Joi.string().required(),
        fecha_nacimiento: Joi.string(),
        sexo: Joi.string()
    }

    const { error } = Joi.validate(usuario, usuarioSchema)
    if (error) {
        console.log('error validate')
        return false        
    }
    console.log('Usuario Valido')
    return true
}

function validarTelefonos(telefonos){
    const telefonoSchema = {
        telefono: Joi.number().required(),
        descripcion: Joi.string(),
    }
    for (let i = 0; i < telefonos.length; i++) {
        const tel = telefonos[i];
        const { error } = Joi.validate(tel, telefonoSchema)
        if (error) {
            console.log('error al validar telefono')
            return false        
        } 
    }
    console.log('Telefonos valido')
    return true
}

function validarDireccion(direcciones){
    const direccionSchema = {
        id_direccion: Joi.number().required(),
        id_usuario: Joi.number().required(),
        calle: Joi.string().required(),
        numero: Joi.number().required(),
        piso: Joi.number(),
        departamento: Joi.string(),
        cp: Joi.string().required(),
        provincia: Joi.string().required(),
        localidad: Joi.string().required()
    }
    
    const { error } = Joi.validate(direcciones, direccionSchema)
    if (error) {
        console.log('error al validar direccion')
        return false        
    } 
    
    console.log('Direccion valida')
    return true
}

async function esDuplicado(usuario){
    const conn = getConexion()
    let esDuplicado = false
    let registro = null

    try {
        registro = await conn.select().from(tabla).where('id_usuario', '=', usuario.id_usuario)
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
    agregarUsuario,
    eliminarUsuario,
    modificarUsuario
}