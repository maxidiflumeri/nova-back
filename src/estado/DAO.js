import crearConexion from '../../db/conexionDB.js'
import Joi from '@hapi/joi'
//import sql from "mssql"
//DEV BY EZE LABORANTI

const tabla = 'ESTADOS'

async function obtenerTodos() {
    const conn = crearConexion()
    let lista = []
    try {
        lista = await conn.select().from(tabla)
        conn.destroy()
    }
    catch (error) {
        console.log(error)
        conn.destroy()
    }
    return lista
}

async function agregar(objeto) {
    const conn = crearConexion()
    let resultado = null
    if (validar(objeto)) {
        if (!await esDuplicado(objeto)) {
            try {
                await conn.insert(objeto).into(tabla)
                resultado = {
                    "msg": "Objeto agregado."
                }
                conn.destroy()
            }
            catch (error) {
                resultado = error;
                conn.destroy()
            }
        }
        else {
            resultado = {
                "msg": "Claves duplicadas"
            }
        }
    } else {
        resultado = {
            "error": 400,
            "msg": "Body Incorrecto."
        }
    }

    return resultado
}

function validar(objeto) {
    const objetoSchema = {
        id_estado: Joi.string().required().length(1),
        descripcion: Joi.string().required()
    }

    const { error } = Joi.validate(objeto, objetoSchema)
    if (error) {
        console.log('Error validate')
        return false
    }
    console.log('Correcto validate')
    return true
}

async function esDuplicado(objeto) {
    const conn = crearConexion()
    let esDuplicado = false
    let registro = null

    try {
        registro = await conn.select().from(tabla).where('id_estado', '=', objeto.id_estado).orWhere('descripcion', '=', objeto.descripcion)
        conn.destroy()
    }
    catch (error) {
        console.log(error)
        conn.destroy()
    }

    if (registro.length > 0) {
        esDuplicado = true
    }

    console.log(registro)
    console.log('Claves duplicadas: ' + esDuplicado)
    return esDuplicado
}

export default {
    obtenerTodos,
    agregar
}