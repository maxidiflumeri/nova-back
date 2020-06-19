import crearConexion from '../../db/conexionDB.js'
import Joi from '@hapi/joi'
const tablaCab = 'PEDIDOS_CAB'
const tablaDet = 'PEDIDOS_DET'


async function obtenerTodos() {     
    const conn = crearConexion()
    let lista = []
    try{ 
        lista = await conn.select().from(tablaCab)
        console.log(pedidoNew)
        conn.destroy()
    }
    catch(error){
        console.log(error)
        conn.destroy()
    }
    return lista  
}

async function obtenerDetalles(id) {  
    const conn = crearConexion()
    let lista = []  
    try {                   
        lista = await conn.select().from(tablaDet).where('id_pedido','=',id)
        conn.destroy()
    }
    catch(error) {
        console.log(error)
        conn.destroy()
    }
    return lista
} 

async function obtenerPedidoPorId(id) {  
    const conn = crearConexion()
    let lista = []
    try{         
        lista =  await conn.select().from(tablaCab).where('id_pedido','=',id)
        conn.destroy()
    }
    catch(error){
        console.log(error)
        conn.destroy()
    }
    return lista    
}

async function obtenerPedidosPorUsuario(id) {      
    const conn = crearConexion()
    let lista = []
    try{
        lista =  await conn.select().from(tablaCab).where('id_usuario','=',id)
        conn.destroy()
    }
    catch(error){
        console.log(error)
        conn.destroy()
    }
    return lista
}

async function agregarPedido(pedidoCompleto){

    const pedidoCab = separarPedido(pedidoCompleto)

    const listaProductos = separarListaProductos(pedidoCompleto, pedidoCab)

    
    const conn = crearConexion()
    let resultado = null
    if(validarPedidoCab(pedidoCab) && validarPedidoDet(listaProductos)){
        try{            
            resultado = await conn.insert(pedidoCab).into(tablaCab)
            const pedidoNew = await conn.max({ id_pedido: 'id_pedido' }).from(tablaCab).where('id_usuario','=',pedidoCab.id_usuario)
            const idPedido = pedidoNew[0].id_pedido  

            for (let i = 0; i < listaProductos.length; i++) {                
                listaProductos[i]["id_pedido"] = idPedido;                
                await conn.insert(listaProductos[i]).into(tablaDet)                                                
            }                      
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


function validarPedidoCab(pedido) {

        
    const pedidoSchema = {         
        id_usuario: Joi.number().required(),
        id_direccion: Joi.number().required(),
        importe_total: Joi.number().required(),
        id_estado: Joi.number().required(),
        fecha: Joi.string().required()
    }

    const { error } = Joi.validate(pedido, pedidoSchema)
    if (error) {
        console.log('error validate cab')
        return false        
    }
    console.log('Correcto validate cab')
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
            console.log('error validate det')
            return false        
        }        
    }
    console.log('Correcto validate det')
    return true
}

function separarPedido(pedidoCompleto){

    let pedidoCab = {
        "id_usuario": pedidoCompleto.id_usuario,
        "id_direccion":  pedidoCompleto.id_direccion,
        "fecha": obtenerFecha(),
        "importe_total": pedidoCompleto.importe_total,
        "id_estado": pedidoCompleto.id_estado
    }

    return pedidoCab

}

function separarListaProductos(pedidoCompleto, pedidoCab){

    let impTotal = 0
    let listaProductos = []
    for (let i = 0; i < pedidoCompleto.productos.length; i++) {
        let impParcial = 0        
        const prod = pedidoCompleto.productos[i];
        const pedidoDet = {
            "id_producto": prod.id_producto,
            "cantidad": prod.cantidad,
            "importe_unitario": prod.importe_unitario
        } 
        impParcial = pedidoDet.cantidad * pedidoDet.importe_unitario
        impTotal = impTotal + impParcial
        listaProductos.push(pedidoDet)         
    }  

    pedidoCab.importe_total = impTotal

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
    agregarPedido
}


