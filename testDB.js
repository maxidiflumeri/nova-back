// // Import the mssql package
// import sql from "mssql";

// // Create a configuration object for our Azure SQL connection parameters
// var dbConfig = {
//  server: "srvnova.database.windows.net", // Use your SQL server name
//  database: "nova-db", // Database to connect to
//  user: "nova", // Use your username
//  password: "Nov42020", // Use your password
//  port: 1433,
//  // Since we're on Windows Azure, we need to set the following options
//  options: {
//        encrypt: true
//    }
// };

// // This function connects to a SQL server, executes a SELECT statement,
// // and displays the results in the console.
// function getCustomers() {
//  // Create connection instance
//  var conn = new sql.ConnectionPool(dbConfig); 

//  conn.connect()
//  // Successfull connection
//  .then(function () {

//    // Create request instance, passing in connection instance
//    var req = new sql.Request(conn);

//    // Call mssql's query method passing in params
//    let id = 2
//    req.query(`SELECT * FROM [estados] where id_estado = ${id}`)
//    .then(function (recordset) {
//      console.log(recordset);
//      conn.close();
     
//    })
//    // Handle sql statement execution errors
//    .catch(function (err) {
//      console.log(err);
//      conn.close();
//    })

//  })
//  // Handle connection errors
//  .catch(function (err) {
//    console.log(err);
//    conn.close();
//  });
// }


// getCustomers();