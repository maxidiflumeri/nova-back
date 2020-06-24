import crearConexion from '../../db/conexionDB.js'

const tabla = 'TELEFONOS'

/* ----------------------------
--------------CRUD-------------
------------------------------- */

async function obtenerTodos() {  
    const conn = crearConexion()
    let lista = []
    try{        
        lista = await conn.select().from(tabla)
        conn.destroy()
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