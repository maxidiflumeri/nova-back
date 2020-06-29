// DEV BY MAXIMILIANO ARIEL DI FLUMERI

import getConexion from '../../db/conexionDB.js'
import Joi from '@hapi/joi'
import msj from '../mensajes/mensajes.js'
import prod from '../producto/dao.js'
import usu from '../usuario/dao.js'



const tablaCab = 'PEDIDOS_CAB'
const tablaDet = 'PEDIDOS_DET'


async function obtenerTodos() {     
    const conn = getConexion()    
    let lista = []
    try{ 
        lista = await conn.select().from(tablaCab)      
                    
    }
    catch(error){
        console.log(error)
    }
    return lista  
}

async function obtenerDetalles(id) {  
    const conn = getConexion()
    let lista = []  
    try {                   
        lista = await conn.select().from(tablaDet).where('id_pedido','=',id)
    }
    catch(error) {
        console.log(error)
    }
    return lista
} 

async function obtenerPedidoPorId(id) {  
    const conn = getConexion()
    let lista = []
    try{         
        lista =  await conn.select().from(tablaCab).where('id_pedido','=',id)
    }
    catch(error){
        console.log(error)
    }
    return lista    
}

async function obtenerPedidosPorUsuario(id) {      
    const conn = getConexion()
    let lista = []
    try{
        lista =  await conn.select().from(tablaCab).where('id_usuario','=',id)
    }
    catch(error){
        console.log(error)
    }
    return lista
}

async function agregarPedido(pedidoCompleto){

    const pedidoCab = separarPedido(pedidoCompleto)
    const listaProductos = await separarListaProductos(pedidoCompleto, pedidoCab)
    
    const conn = getConexion()
    let resultado = null    
    if(listaProductos.length == 0){        
        resultado = msj.mensajeCustom(404, "Productos inexistentes en la lista")
    }else if((await usu.obtenerUsuarioPorId(pedidoCab.id_usuario)).length == 0){
        resultado = msj.mensajeCustom(404, "Usuario inexistente.")    
    }else if(validarPedidoCab(pedidoCab) && validarPedidoDet(listaProductos)){
            try{            
                resultado = await conn.insert(pedidoCab).into(tablaCab)
                const pedidoNew = await conn.max({ id_pedido: 'id_pedido' }).from(tablaCab).where('id_usuario','=',pedidoCab.id_usuario)
                const idPedido = pedidoNew[0].id_pedido  

                for (let i = 0; i < listaProductos.length; i++) {                
                    listaProductos[i]["id_pedido"] = idPedido;                
                    await conn.insert(listaProductos[i]).into(tablaDet)                                                
                }  
                resultado = msj.mensajePost()                    
            }
            catch(error){
                console.log(error)                
            }         
    }else{
        resultado = msj.errorBody()
    }    

    return resultado
}

async function modificarPedido(id, pedidoCompleto){
    const pedidoCab = separarPedido(pedidoCompleto)
    const listaProductos = await separarListaProductos(pedidoCompleto, pedidoCab)
    const conn = getConexion()
    let resultado = null
    if(listaProductos.length == 0){        
        resultado = msj.mensajeCustom(404, "Productos inexistentes en la lista")
    }else if(validarPedidoCab(pedidoCab) && validarPedidoDet(listaProductos)){
        try{            
            if(await eliminarDetallesPorId(id) > 0){                
                await conn.update(pedidoCab).where('Id_pedido','=',id).from(tablaCab)
                
                for (let i = 0; i < listaProductos.length; i++) {
                    listaProductos[i]["id_pedido"] = id;
                    const prodDetalle = listaProductos[i];
                    await conn.insert(prodDetalle).into(tablaDet)                    
                } 
                resultado = msj.mensajePut()    
            }else{
                resultado = msj.errorNoEncontrado()
            }
        }
        catch(error){
            console.log(error)
        }
    }else{
        resultado = msj.errorBody()
    }

    return resultado

}

async function eliminarPedido(id) {
    const conn = getConexion()
    let resultado = null
    let pedidoBuscado = await obtenerPedidoPorId(id)
    let detalleBuscado = await obtenerDetalles(id)
    if(pedidoBuscado.length > 0 && detalleBuscado.length > 0){
        let existeDet 
        let existeCab
        try {
            existeDet = await conn.del().where('ID_PEDIDO', '=', id).from(tablaDet)
            existeCab = await conn.del().where('ID_PEDIDO', '=', id).from(tablaCab) 
            if (existeDet > 0 && existeCab == 1) {
                resultado = msj.mensajeDelete()
            }
        }
        catch (error) {
            console.log(error)
        }
    }else{
        resultado = msj.errorNoEncontrado()
    }    

    return resultado
}

async function eliminarDetallesPorId(id){
    const conn = getConexion()    
    let cantBorrados = await conn.del().where('ID_PEDIDO', '=', id).from(tablaDet)        
    return cantBorrados
}

function validarPedidoCab(pedido) {
        
    const pedidoSchema = {         
        id_usuario: Joi.number().required(),
        id_direccion: Joi.number().required(),
        importe_total: Joi.number().required(),
        id_estado: Joi.string().required(),
        fecha: Joi.string().required()
    }

    const { error } = Joi.validate(pedido, pedidoSchema)
    if (error) {          
        return false        
    }      
    return true
}


function validarPedidoDet(productos) {
        
    const productosSchema = {                 
        id_producto: Joi.number().required(),
        cantidad: Joi.number().required(),
        importe_unitario: Joi.number().required()
    }

    for (let i = 0; i < productos.length; i++) {
        const prod = productos[i];
        const { error } = Joi.validate(prod, productosSchema)
        if (error) {                      
            return false        
        }        
    }      
    return true
}

function separarPedido(pedidoCompleto){

    let pedidoCab = {
        "id_usuario": pedidoCompleto.id_usuario,
        "id_direccion":  pedidoCompleto.id_direccion,
        "fecha": pedidoCompleto.fecha,
        "importe_total": pedidoCompleto.importe_total,
        "id_estado": pedidoCompleto.id_estado
    }

    return pedidoCab

}

async function separarListaProductos(pedidoCompleto, pedidoCab){

    let impTotal = 0
    let listaProductos = []
    let i = 0
    let faltaProducto = 0

    while(i < pedidoCompleto.productos.length && faltaProducto == 0){
        let impParcial = 0        
        const producto = pedidoCompleto.productos[i]; 
        let productoBuscado = await prod.obtenerProductoPorId(producto.id_producto)       
        if(productoBuscado.length == 0){
            faltaProducto = 1            
        }else{                
            const pedidoDet = {
                "id_producto": producto.id_producto,
                "cantidad": producto.cantidad,
                "importe_unitario": productoBuscado[0].PRECIO
            }
            impParcial = pedidoDet.cantidad * pedidoDet.importe_unitario
            impTotal = impTotal + impParcial        
            listaProductos.push(pedidoDet) 
        }
        i++       
    }
    pedidoCab.importe_total = impTotal        
    if(faltaProducto == 1){        
        listaProductos = []
    }
    return listaProductos
}

function obtenerFecha(){

    let fecha_ob = new Date();
    let dia = ("0" + fecha_ob.getDate()).slice(-2);
    let mes = ("0" + (fecha_ob.getMonth() + 1)).slice(-2);
    let anio = fecha_ob.getFullYear();
    let fechaAct = anio + "-" + mes + "-" + dia

    return fechaAct

}

export default{
    obtenerTodos,
    obtenerDetalles,
    obtenerPedidoPorId,
    obtenerPedidosPorUsuario,
    agregarPedido,
    eliminarPedido,
    modificarPedido
}


