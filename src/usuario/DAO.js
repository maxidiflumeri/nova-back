import crearConexion from '../../db/conexionDB.js'
import sql from "mssql";

const tabla = 'USUARIOS'

async function obtenerTodos() {  
    const conn = crearConexion()
    let lista = []
    try{        
        lista = await conn.select().from(tabla)
        conn.destroy()
        //Prueba uno!
        //Prueba 2!
    }
    catch(error){
        console.log(error)
        conn.destroy()
    }
    return lista  
}



export default{
    obtenerTodos
}