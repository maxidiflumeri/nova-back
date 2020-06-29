
//DEV BY Castro Santiago

import getConexion from '../../db/conexionDB.js'
import sql from "mssql";
import Joi from '@hapi/joi'
import mensajes from '../mensajes/mensajes.js'
import daoMarca from '../marca/DAO.js'
import daoTipo from '../tipo-producto/DAO.js'

// Nombre de Tabla de Productos en SQL
const tabla = 'PRODUCTOS'

// Funcion que trae todos los Productos
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

// Funcion que agregaProducto
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
        if ((await buscarProdExistente(producto.ID_TIPO, producto.ID_MARCA, producto.MODELO)).length == 0) {
            try {
                await conn.insert(producto).into(tabla)
                resultado = mensajes.mensajePost() // informa que el producto se agrego exitosamente
            }
            catch (error) {
                console.log(error)
            }
        }
        else {
            resultado = mensajes.errorDuplicados() // informa que el producto ya existe
        }

        console.log(resultado)
    } else {
        resultado = mensajes.errorBody()  // informa que el producto posee errores en el body
    }

    return resultado
}

// Funcion que Modifica el Producto
async function modificarProducto(id, producto) {

    const conn = getConexion()
    let resultado = null
    if (validarProducto(producto)) {
        const prod = await obtenerProductoPorId(id)
        if (prod.length > 0) {
            const marca = await daoMarca.obtenerPorId(producto.ID_MARCA)
            if (marca.length > 0) {
                const tipo = await daoTipo.obtenerPorId(producto.ID_TIPO)
                if (tipo.length > 0) {
                    try {
                        await conn.update(producto).where('ID_PRODUCTO', '=', id).from(tabla)
                        resultado = mensajes.mensajePut() // informa que el producto se actualizo correctamente
                    }
                    catch (error) {
                        console.log(error)
                    }
                }
                else {
                    resultado = mensajes.mensajeCustom(400, 'El tipo no existe')
                }
            }
            else {
                resultado = mensajes.mensajeCustom(400, 'La marca no existe')
            }

        }
        else {
            resultado = mensajes.errorNoEncontrado()  // informa que el producto posee errores en el body
        }
        console.log(resultado)
    }
    else {
        resultado = mensajes.errorBody()  // informa que el producto posee errores en el body
    }
    return resultado
}

// Funcion que busca por IdProducto
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

// Funcion que busca por Modelo de Producto
async function obtenerProductoPorModelo(modelo) {
    const conn = getConexion()
    let lista = []
    try {
        lista = await conn.select().from(tabla).where('modelo', 'like', `%${modelo}%`)
    }
    catch (error) {
        console.log(error)

    }
    return lista
}

// Funcion que busca por IdMarca
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

// Funcion que busca producto por idTipo, idMarca, modelo enviados por parametro
async function buscarProdExistente(idTipo, idMarca, modelo) {
    const conn = getConexion()
    let lista = []
    try {
        lista = await conn.select().from(tabla).where('ID_TIPO', '=', idTipo).andWhere('ID_MARCA', '=', idMarca).andWhere('MODELO', '=', modelo)

    }

    catch (error) {
        console.log(error)
    }
    return lista
}

// Funcion que busca producto por idTipo
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

// Funcion que busca producto con el contenido de la descripcion
async function obtenerProductoPorDescripcion(id) {
    const conn = getConexion()
    let lista = []
    try {
        lista = await conn.select().from(tabla).where('descripcion', 'like', `%${id}%`)
        console.log(lista)
    }
    catch (error) {
        console.log(error)
    }
    return lista
}

// Funcion que Valida Producto para agregarlo
function validarProducto(producto) {

    /* console.log(producto) */
    const productoSchema = {

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

// Funcion que Elimina Producto buscando por IdProducto
async function eliminarProductoById(id) {
    const conn = getConexion()
    let resultado = null
    let cond
    try {
        cond = await conn.del().where('ID_PRODUCTO', '=', id).from(tabla)
        if (cond == 1) {
            resultado = mensajes.mensajeDelete()
        }
        else {
            resultado = mensajes.errorNoEncontrado()
        }
    }

    catch (error) {
        console.log(error)
    }

    return resultado
}

//Exports Funciones
export default {
    agregarProducto,
    obtenerTodos,
    validarProducto,
    obtenerProductoPorId,
    obtenerProductoPorIdMarca,
    obtenerProductoPorIdTipo,
    obtenerProductoPorDescripcion,
    eliminarProductoById,
    obtenerProductoPorModelo,
    buscarProdExistente,
    modificarProducto
}
