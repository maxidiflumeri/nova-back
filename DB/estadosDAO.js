import crearConexion from './conexionDB.js'

const knex = crearConexion()

async function leerTodos() {  
    let listaEstados = []  
    try {
        listaEstados = await knex.select().from('[novadb].[dbo].[ESTADOS]')
        console.log(listaEstados)
    }
    catch(error) {
        console.log(error)
    }
    return listaEstados
}   

leerTodos()