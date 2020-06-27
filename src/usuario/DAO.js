import getConexion from '../../db/conexionDB.js'
import Joi from '@hapi/joi'


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
        conn.destroy()
    }
    catch(error){
        console.log(error)
        conn.destroy()
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
        try{            
            resultado = await conn.insert(usuarioFin).into(tabla)
            const usuarioNew = await conn.max({ id_usuario: 'id_usuario' }).from(tabla).where('id_usuario','=',usuarioFin.id_usuario)
            const idUsuario = usuarioNew[0].id_usuario
            for (let i = 0; i < telefonos.length; i++) {
                telefonos[i]["id_usuario"] = idUsuario
                console.log(telefonos[i])
                await conn.insert(telefonos[i]).into(tablaTel)
            }

            await conn.insert(direccion).into(tablaDir)

            conn.destroy()
        }
        catch(error){
            console.log(error)
            conn.destroy()
        }
        console.log(resultado)
    }else{
        resultado = {            
            "error": 400,
            "msg": "Body Incorrecto."            
        }
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
    console.log(listaTelefonos)
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
    console.log('Correcto validar telefonos')
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
    
    console.log('Correcto validar direcciones')
    return true
}
export default{
    obtenerTodos,
    agregarUsuario
}