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
        try {
            await conn.insert(objeto).into(tabla)
            resultado = {
                "msg": "Objeto agregado."
            }
            conn.destroy()
        }
        catch (error) {
            console.log(error)
            conn.destroy()
        }
        console.log(resultado)
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

export default {
    obtenerTodos,
    agregar
}