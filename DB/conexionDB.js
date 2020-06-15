import knexLib from 'knex'



function crearConexion(){
    const knex = knexLib({
        client: 'mssql',
        connection: {
            server: '127.0.0.1',   
            user: 'sa',
            password: '1234',
            options:{
                port: 1433,
                database: 'novadb',
                encrypt: true,
                enableArithAbort: true
            }
        }        
    })

    return knex
    
    
}



export default crearConexion





