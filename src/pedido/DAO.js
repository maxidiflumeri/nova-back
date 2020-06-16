import crearConexion from '../../db/conexionDB.js'
import sql from "mssql";
import Joi from '@hapi/joi'




const tablaCab = 'PEDIDOS_CAB'
const tablaDet = 'PEDIDOS_DET'

async function obtenerTodos() {     
    const conn = crearConexion()
    let lista = []
    try{ 
        lista = await conn.select().from(tablaCab)
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

async function agregarPedido(pedido){

    let fecha_ob = new Date();
    let dia = ("0" + fecha_ob.getDate()).slice(-2);
    let mes = ("0" + (fecha_ob.getMonth() + 1)).slice(-2);
    let anio = fecha_ob.getFullYear();
    let fechaAct = anio + "-" + mes + "-" + dia
            
    pedido["fecha"] = fechaAct
    
    const conn = crearConexion()
    let resultado = null
    if(validarPedido(pedido)){
        try{            
            resultado = await conn.insert(pedido).into(tablaCab)
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


function validarPedido(pedido) {

        
    const pedidoSchema = {         
        id_usuario: Joi.number().required(),
        id_direccion: Joi.number().required(),
        importe_total: Joi.number().required(),
        id_estado: Joi.number().required(),
        fecha: Joi.string().required()
    }

    const { error } = Joi.validate(pedido, pedidoSchema)
    if (error) {
        console.log('error validate')
        return false        
    }
    console.log('Correcto validate')
    return true
}

export default{
    obtenerTodos,
    obtenerDetalles,
    obtenerPedidoPorId,
    obtenerPedidosPorUsuario,
    agregarPedido
}

