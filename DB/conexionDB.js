import sql from "mssql";


function crearConexion(){
    var dbConfig = {
    server: "srvnova.database.windows.net", 
    database: "nova-db",
    user: "nova", 
    password: "Nov42020", 
    port: 1433,

    options: {
        encrypt: true,
        enableArithAbort: true
    }
    };

    var conn = new sql.ConnectionPool(dbConfig);    

    return conn
}


export default crearConexion





