import getConexion from '../../db/conexionDB.js'
import Joi from '@hapi/joi'

//DEV BY EZE LABORANTI

const tabla = 'MARCAS'

async function obtenerTodos() {
    const conn = getConexion()
    let lista = []
    try {
        lista = await conn.select().from(tabla)
    }
    catch (error) {
        console.log(error)
    }
    return lista
}

async function agregar(objeto) {
    const conn = getConexion()
    let resultado = null
    if (validar(objeto)) {
        if (!await esDuplicado(objeto)) {
            try {
                await conn.insert(objeto).into(tabla)
                resultado = {
                    "msg": "Objeto agregado."
                }
            }
            catch (error) {
                resultado = error;
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
    const conn = getConexion()
    let esDuplicado = false
    let registro = null

    try {
        registro = await conn.select().from(tabla).where('descripcion', '=', objeto.descripcion)
    }
    catch (error) {
        console.log(error)
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