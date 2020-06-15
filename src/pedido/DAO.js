import crearConexion from '../../DB/conexionDB.js'

const knex = crearConexion()

async function obtenerTodos() {  
    let lista = []  
    try {
        lista = await knex.select().from('[novadb].[dbo].[PEDIDOS_CAB]')
        console.log(lista)
    }
    catch(error) {
        console.log(error)
    }
    return lista
}  

async function obtenerDetalles(id) {  
    let lista = []  
    try {
        lista = await knex.select().from('[novadb].[dbo].[PEDIDOS_DET]').where('ID_PEDIDO','=',id)
        console.log(lista)
    }
    catch(error) {
        console.log(error)
    }
    return lista
} 



export default{
    obtenerTodos,
    obtenerDetalles
}

