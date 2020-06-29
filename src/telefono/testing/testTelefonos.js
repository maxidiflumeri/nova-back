import crearServidor from '../../config/server.js'
import crearCliente from '../testing/clienteTelefonos.js'

/*-------------------------------
------------Positivos------------
-------------------------------*/

async function testObtenerTodos(cli){
    console.log("\n----------------------------")
    console.log("\nCOMIENZAN PRUEBAS POSITIVAS: ")
    console.log("\n----------------------------")
    let rta = await cli.obtenerTodos()
    console.log("\nObtener todos los telefonos: ")
    console.log(rta)
}

async function testObtenerTelefonosPorIdUsuario(cli){
    let rta = await cli.obtenerTelefonosPorIdUsuario(1)
    console.log("\nBusqueda telefono por Id: ")
    console.log(rta)
}

async function testAgregarTelefono(cli){
    let telefono =  {
        id_usuario: 4,
        telefono : 12341234,
        descripcion: 'Casa 2'
    }
    let rta = await cli.agregarTelefono(telefono)
    console.log("\nTelefono Agregado: ")
    console.log(rta)
}

async function testModificarTelefono(cli){
    let telefono =  {
        id_usuario: 4,
        telefono : 23233333,
        descripcion: 'Casa 2 modificado'
    }
    let rta = await cli.modificarTelefono(telefono.id_usuario, telefono, 12341234)
    console.log("\nModificar Telefono: ")
    console.log(rta)
}

async function testEliminarTelefono(cli){    
    let rta = await cli.eliminarTelefono(4, 23233333)
    console.log("\nEliminar Telefono:")    
    console.log(rta)
}

/*------------------------------
------------Fallidos------------
------------------------------*/

//Busco por ID inexistente
async function testObtenerTelefonosPorIdUsuarioFallido(cli){
    console.log("\n----------------------------")
    console.log("\nCOMIENZAN PRUEBAS FALLIDAS: ")
    console.log("\n----------------------------")
    let rta = await cli.obtenerTelefonosPorIdUsuario(12341234)
    console.log("\nBusqueda telefono por Id Erroneo: ")
    console.log(rta)
}

//Agrego con clave y email invalida
async function testAgregarTelefonoFallido(cli){
    let telefono =  {
        id_usuario: 4,
        telefono : 2323435016,
        descripcion: 'Casa'
    }
    let rta = await cli.agregarTelefono(telefono)
    console.log("\nTelefono Erroneo: ")
    console.log(rta)
}

// Modifico Telefono inexistente
async function testModificarTelefonoFallido(cli){
    let telefono =  {
        id_usuario: 423423,
        telefono : 23233333,
        descripcion: 'Casaita'
    }
    let rta = await cli.modificarTelefono(telefono.id_usuario, telefono, 123412341)
    console.log("\nModificar Telefono Incorrecto: ")
    console.log(rta)
}

// Modifico Telefono de forma erronea
async function testModificarTelefonoFallido2(cli){
    let telefono =  {
        id_usuario: 4,
        telefono : '2323asdfasdf3333',
        descripcion: 'Casaita'
    }
    let rta = await cli.modificarTelefono(telefono.id_usuario, telefono, 2323435016)
    console.log("\nModificar Telefono Erroneo: ")
    console.log(rta)
}

//Elimino usuario inexistente
async function testEliminarTelefonoFallido(cli){    
    let rta = await cli.eliminarTelefono(1234125, 23234234)
    console.log("\nEliminar Telefono Erroneo:")    
    console.log(rta)
}

async function main(){  

    const tests = [
        testObtenerTodos,
        testObtenerTelefonosPorIdUsuario,
        testAgregarTelefono,
        testModificarTelefono,
        testEliminarTelefono,
        testObtenerTelefonosPorIdUsuarioFallido,
        testAgregarTelefonoFallido,
        testModificarTelefonoFallido,
        testModificarTelefonoFallido2,
        testEliminarTelefonoFallido
    ]
    

    const app = crearServidor()
    const url = 'http://localhost'
    const PORT = 8080
    const server = app.listen(PORT, async () => {       
         console.log(`Servidor express escuchando en el puerto ${PORT}`)
         const actualPort = server.address().port
         const cli = crearCliente(url,actualPort)

         for (const test of tests) {
            await test(cli)       
             
         }           

    })
    
}

main()