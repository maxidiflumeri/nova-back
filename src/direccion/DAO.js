import crearConexion from '../../db/conexionDB.js'
import Joi from '@hapi/joi'

const tabla= 'DIRECCIONES'

/* ----------------------------
--------------CRUD-------------
------------------------------- */

async function obtenerTodos() {  
    const conn = crearConexion()
    let lista = []
    try{        
        lista = await conn.select().from(tabla)
        conn.destroy()
    }
    catch(error){
        console.log(error)
        conn.destroy()
    }
    return lista  
}

/* async function obtenerDireccionPorId(id) {  
    const conn = crearConexion()
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

async function agregarTelefono(telefono){
    const conn = crearConexion()
    let resultado = null
    const usuarioFin = separarUsuario(usuario)
    const telefonos = separarTelefonos(usuario)
    const direccion = separarDireccion(usuario)
    if(validarUsuario(usuarioFin) && validarTelefonos(telefonos) && validarDireccion(direccion)){
        
    }

    return resultado
}*/


/* ----------------------------
-----------VALIDADORES---------
------------------------------- 

function validarDireccion(usuario) {
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
}*/
export default{
    obtenerTodos
}