import crearConexion from '../../db/conexionDB.js'
import sql from "mssql";
import Joi from '@hapi/joi'

const tabla = 'PRODUCTOS'


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

async function agregarProducto(producto) {

    let fecha_ob = new Date();
    let dia = ("0" + fecha_ob.getDate()).slice(-2);
    let mes = ("0" + (fecha_ob.getMonth() + 1)).slice(-2);
    let anio = fecha_ob.getFullYear();
    let fechaAct = anio + "-" + mes + "-" + dia
    producto["FECHA_INGRESO"] = fechaAct


    const conn = crearConexion()
    let resultado = null
    if (validarProducto(producto)) {
        try {
            await conn.insert(producto).into(tabla)
            resultado = {
                "msg": "Producto Agregado correctamente."
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

async function obtenerProductoPorId(id) {
    const conn = crearConexion()
    let lista = []
    try {
        lista = await conn.select().from(tabla).where('ID_PRODUCTO', '=', id)
        conn.destroy()
    }
    catch (error) {
        console.log(error)
        conn.destroy()
    }
    return lista
}

async function obtenerProductoPorIdMarca(id) {
    const conn = crearConexion()
    let lista = []
    try {
        lista = await conn.select().from(tabla).where('ID_MARCA', '=', id)
        conn.destroy()
    }
    catch (error) {
        console.log(error)
        conn.destroy()
    }
    return lista
}

async function obtenerProductoPorIdTipo(id) {
    const conn = crearConexion()
    let lista = []
    try {
        lista = await conn.select().from(tabla).where('ID_TIPO', '=', id)
        conn.destroy()
    }
    catch (error) {
        console.log(error)
        conn.destroy()
    }
    return lista
}


async function obtenerProductoPorDescripcion(id) {
    const conn = crearConexion()
    let lista = []
    try {
        lista = await conn.select().from(tabla).where('DESCRIPCION', '=', id)
        conn.destroy()
        console.log(lista)
    }
    catch (error) {
        console.log(error)
        conn.destroy()
    }
    return lista
}

function validarProducto(producto) {

    console.log(producto)
    const productoSchema = {
        /* ID_PRODUCTO: Joi.number().required(), */
        ID_TIPO: Joi.number().required(),
        ID_MARCA: Joi.number().required(),
        MODELO: Joi.string().required(),
        DESCRIPCION: Joi.string().required(),
        STOCK: Joi.number().required(),
        PRECIO: Joi.number().required(),
        FECHA_INGRESO: Joi.string().required(),
        CANT_VISITAS: Joi.number().required(),
        FOTO1: Joi.string(),
        FOTO2: Joi.string(),
        FOTO3: Joi.string()

    }

    const { error } = Joi.validate(producto, productoSchema)

    if (error) {
        console.log('error validate')
        console.log(error)
        return false
    }
    console.log('Correcto validate')
    return true
}

async function eliminarProductoById(id) {
    const conn = crearConexion()
    let lista = []
    lista = await conn.select().from(tabla)
    const posBuscada = lista.findIndex(p => p.id == id)
    if (posBuscada == -1) {
        throw crearError(404, 'producto no encontrado con ese ID')
    }
    lista.splice(posBuscada, 1)
    conn.destroy()
    console.log(lista)
    return lista
}


export default {
    agregarProducto,
    obtenerTodos,
    validarProducto,
    obtenerProductoPorId,
    obtenerProductoPorIdMarca,
    obtenerProductoPorIdTipo,
    obtenerProductoPorDescripcion,
    eliminarProductoById
}