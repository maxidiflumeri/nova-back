import crearConexion from '../../db/conexionDB.js'
import sql from "mssql";

const conn = crearConexion()

const tablaCab = 'PEDIDOS_CAB'
const tablaDet = 'PEDIDOS_DET'

async function obtenerTodos() {  
    await conn.connect()
    let lista = []
    try{        
        var req = new sql.Request(conn)            
        lista =  await req.query(`SELECT * FROM ${tablaCab}`)
        conn.close()
    }
    catch(error){
        console.log(error)
        conn.close()
    }
    return lista.recordset    
}

async function obtenerDetalles(id) {  
    await conn.connect()
    let lista = []  
    try {
        var req = new sql.Request(conn)            
        lista =  await req.query(`SELECT * FROM ${tablaDet} where id_pedido = ${id}`)
        conn.close()
    }
    catch(error) {
        console.log(error)
        conn.close()
    }
    return lista.recordset
} 



export default{
    obtenerTodos,
    obtenerDetalles
}

