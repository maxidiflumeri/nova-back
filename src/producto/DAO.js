import getConexion from '../../db/conexionDB.js'
import sql from "mssql";
import Joi from '@hapi/joi'
import mensajes from '../mensajes/mensajes.js'

const tabla = 'PRODUCTOS'


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

async function agregarProducto(producto) {

    let fecha_ob = new Date();
    let dia = ("0" + fecha_ob.getDate()).slice(-2);
    let mes = ("0" + (fecha_ob.getMonth() + 1)).slice(-2);
    let anio = fecha_ob.getFullYear();
    let fechaAct = anio + "-" + mes + "-" + dia
    producto["FECHA_INGRESO"] = fechaAct


    const conn = getConexion()
    let resultado = null
    if (validarProducto(producto)) {
        if ((await buscarProdExistente(producto.ID_TIPO, producto.ID_MARCA, producto.MODELO)).length==0) {
            try {
                await conn.insert(producto).into(tabla)
                resultado = mensajes.mensajePost()
            }
            catch (error) {
                console.log(error)
            }
        }
        else {
            resultado = mensajes.errorDuplicados()
        }

        console.log(resultado)
    } else {
        resultado = mensajes.errorBody()
    }

    return resultado
}

async function obtenerProductoPorId(id) {
    const conn = getConexion()
    let lista = []
    try {
        lista = await conn.select().from(tabla).where('ID_PRODUCTO', '=', id)
    }
    catch (error) {
        console.log(error)

    }
    return lista
}

async function obtenerProductoPorIdModelo(id) {
    const conn = getConexion()
    let lista = []
    try {
        lista = await conn.select().from(tabla).where('MODELO', '=', id)
    }
    catch (error) {
        console.log(error)

    }
    return lista
}

async function obtenerProductoPorIdMarca(id) {
    const conn = getConexion()
    let lista = []
    try {
        lista = await conn.select().from(tabla).where('ID_MARCA', '=', id)
    }
    catch (error) {
        console.log(error)
    }
    return lista
}

async function buscarProdExistente(idTipo, idMarca, modelo) {
    const conn = getConexion()
    let lista = []
    try {
        lista = await conn.select().from(tabla).where('ID_TIPO', '=', idTipo).andWhere('ID_MARCA', '=', idMarca).andWhere('MODELO', '=', modelo)
    console.log('HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    }
    
    catch (error) {
        console.log(error)
    }
    return lista
}

async function obtenerProductoPorIdTipo(id) {
    const conn = getConexion()
    let lista = []
    try {
        lista = await conn.select().from(tabla).where('ID_TIPO', '=', id)
    }
    catch (error) {
        console.log(error)
    }
    return lista
}


async function obtenerProductoPorDescripcion(id) {
    const conn = getConexion()
    let lista = []
    try {
        lista = await conn.select().from(tabla).where('DESCRIPCION', '=', id)
        console.log(lista)
    }
    catch (error) {
        console.log(error)
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
    const conn = getConexion()
    let lista = []
    lista = await conn.select().from(tabla)
    const posBuscada = lista.findIndex(p => p.id == id)
    if (posBuscada == -1) {
        throw crearError(404, 'producto no encontrado con ese ID')
    }
    lista.splice(posBuscada, 1)
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
    eliminarProductoById,
    obtenerProductoPorIdModelo
}