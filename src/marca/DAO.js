import crearConexion from '../../db/conexionDB.js'

const knex = crearConexion()

async function obtenerTodos() {  
    let lista = []  
    try {
        lista = await knex.select().from('[novadb].[dbo].[MARCAS]')
        console.log(lista)
    }
    catch(error) {
        console.log(error)
    }
    return lista
}   

export default{
    obtenerTodos
}