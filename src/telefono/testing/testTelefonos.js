//TOMAS MELENDEZ
import crearServidor from '../../config/server.js'
import crearCliente from '../testing/clienteTelefonos.js'
import config from '../../config/config.js'

/*-------------------------------
------------Positivos------------
-------------------------------*/
async function testLogin(cli){
    // ES ADMIN
    let usuario = {
        usuario: 'santucastro@live.com.ar',
        password: '12345'
    }
    // NO ES ADMIN
    // let usuario = {
    //     usuario: 'ezelaboranti@hotmail.com',
    //     password: '1234'
    // }
    let rta = await cli.login(usuario)
    return rta.token
}

async function testObtenerTodos(cli, token){
    console.log("\n----------------------------")
    console.log("\nCOMIENZAN PRUEBAS POSITIVAS: ")
    console.log("\n----------------------------")
    let rta = await cli.obtenerTodos(token)
    console.log("\nObtener todos los telefonos: ")
    console.log(rta)
}

async function testObtenerTelefonosPorIdUsuario(cli, token){
    let rta = await cli.obtenerTelefonosPorIdUsuario(1, token)
    console.log("\nBusqueda telefono por Id: ")
    console.log(rta)
}

async function testAgregarTelefono(cli, token){
    let telefono =  {
        id_usuario: 4,
        telefono : 12341234,
        descripcion: 'Casa 2'
    }
    let rta = await cli.agregarTelefono(telefono, token)
    console.log("\nTelefono Agregado: ")
    console.log(rta)
}

async function testModificarTelefono(cli, token){
    let telefono =  {
        id_usuario: 4,
        telefono : 23233333,
        descripcion: 'Casa 2 modificado'
    }
    let rta = await cli.modificarTelefono(telefono.id_usuario, telefono, 12341234, token)
    console.log("\nModificar Telefono: ")
    console.log(rta)
}

async function testEliminarTelefono(cli, token){    
    let rta = await cli.eliminarTelefono(4, 23233333, token)
    console.log("\nEliminar Telefono:")    
    console.log(rta)
}

/*------------------------------
------------Fallidos------------
------------------------------*/

//Busco por ID inexistente
async function testObtenerTelefonosPorIdUsuarioFallido(cli, token){
    console.log("\n----------------------------")
    console.log("\nCOMIENZAN PRUEBAS FALLIDAS: ")
    console.log("\n----------------------------")
    let rta = await cli.obtenerTelefonosPorIdUsuario(12341234, token)
    console.log("\nBusqueda telefono por Id Erroneo: ")
    console.log(rta)
}

//Agrego con clave y email invalida
async function testAgregarTelefonoFallido(cli, token){
    let telefono =  {
        id_usuario: 4,
        telefono : 2323435016,
        descripcion: 'Casa'
    }
    let rta = await cli.agregarTelefono(telefono, token)
    console.log("\nTelefono Erroneo: ")
    console.log(rta)
}

// Modifico Telefono inexistente
async function testModificarTelefonoFallido(cli, token){
    let telefono =  {
        id_usuario: 423423,
        telefono : 23233333,
        descripcion: 'Casaita'
    }
    let rta = await cli.modificarTelefono(telefono.id_usuario, telefono, 123412341, token)
    console.log("\nModificar Telefono Incorrecto: ")
    console.log(rta)
}

// Modifico Telefono de forma erronea
async function testModificarTelefonoFallido2(cli, token){
    let telefono =  {
        id_usuario: 4,
        telefono : '2323asdfasdf3333',
        descripcion: 'Casaita'
    }
    let rta = await cli.modificarTelefono(telefono.id_usuario, telefono, 2323435016, token)
    console.log("\nModificar Telefono Erroneo: ")
    console.log(rta)
}

//Elimino usuario inexistente
async function testEliminarTelefonoFallido(cli, token){    
    let rta = await cli.eliminarTelefono(1234125, 23234234, token)
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
    const server = app.listen(config.PORT, config.HOST, async () => {       
        console.log(`Servidor express escuchando en el puerto ${config.PORT}`)
        
        const cli = crearCliente(config.HOST, config.PORT)

        const token = await testLogin(cli)

        for (const test of tests) {
            await test(cli, token)       
             
         }           

    })
    
}

main()