import crearConexion from '../../db/conexionDB.js'

const knex = crearConexion()

async function obtenerTodos() {  
    let listaPedidos = []  
    try {
        listaPedidos = await knex.select().from('[novadb].[dbo].[TIPO_PRODUCTO]')
        console.log(listaPedidos)
        knex.destroy()
    }
    catch(error) {
        console.log(error)
    }
    return listaPedidos
}   

export default{
    obtenerTodos
}