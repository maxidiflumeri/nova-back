//TOMAS MELENDEZ
import crearServidor from '../../config/server.js'
import crearCliente from '../testing/clienteDirecciones.js'
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
    console.log("\nObtener todos las direcciones: ")
    console.log(rta)
}

async function testObtenerDireccionesPorIdUsuario(cli, token){
    let rta = await cli.obtenerDireccionesPorUsuario(1, token)
    console.log("\nBusqueda Direccion por Id: ")
    console.log(rta)
}

async function testAgregarDireccion(cli, token){
    let direccion =  {
        id_usuario: 4,
        id_direccion: 5,
        calle: 'El Chingolo',
        numero: 1144,
        cp: '6700',
        provincia: 'Buenos Aires',
        localidad: 'Lujan'
    }
    let rta = await cli.agregarDireccion(direccion, token)
    console.log("\nDireccion Agregada: ")
    console.log(rta)
}

async function testModificarDireccion(cli, token){
    let direccion =  {
        id_usuario: 4,
        id_direccion: 5,
        calle: 'El Chingolito',
        numero: 1155,
        cp: '6700',
        provincia: 'Buenos Aires',
        localidad: 'Lujan'
    }
    let rta = await cli.modificarDireccion(direccion.id_usuario, direccion.id_direccion, direccion, token)
    console.log("\nModificar Direccion: ")
    console.log(rta)
}

async function testEliminarDireccion(cli, token){    
    let rta = await cli.eliminarDireccion(4, 5, token)
    console.log("\nEliminar Direccion:")    
    console.log(rta)
}

/*------------------------------
------------Fallidos------------
------------------------------*/

//Busco por ID inexistente
async function testObtenerDireccionesPorIdUsuarioFallido(cli, token){
    console.log("\n----------------------------")
    console.log("\nCOMIENZAN PRUEBAS FALLIDAS: ")
    console.log("\n----------------------------")
    let rta = await cli.obtenerDireccionesPorUsuario(12341234, token)
    console.log("\nBusqueda direccion por Id Erroneo: ")
    console.log(rta)
}

//Agrego con id_direccion existente
async function testAgregarDireccionFallido(cli, token){
    let direccion =  {
        id_usuario: 4,
        id_direccion: 2,
        calle: 'El Chingolito',
        numero: 1155,
        cp: '6700',
        provincia: 'Buenos Aires',
        localidad: 'Lujan'
    }
    let rta = await cli.agregarDireccion(direccion, token)
    console.log("\nDireccion Erroneo: ")
    console.log(rta)
}

// Modifico Direccion inexistente
async function testModificarDireccionFallido(cli, token){
    let direccion =  {
        id_usuario: 234,
        id_direccion: 50,
        calle: 'El Chingolito',
        numero: 1155,
        cp: '6700',
        provincia: 'Buenos Aires',
        localidad: 'Lujan'
    }
    let rta = await cli.modificarDireccion(direccion.id_usuario, direccion.id_direccion, direccion, token)
    console.log("\nModificar direccion Incorrecta: ")
    console.log(rta)
}

// Modifico direccion de forma erronea
async function testModificarDireccionFallido2(cli, token){
    let direccion =  {
        id_usuario: 4,
        id_direccion: 1,
        calle: 'El Chingolito',
        numero: '1155sdfgs',
        cp: '6700',
        provincia: 'Buenos Aires',
        localidad: 'Lujan'
    }
    let rta = await cli.modificarDireccion(direccion.id_usuario, direccion.id_direccion, direccion, token)
    console.log("\nModificar direccion Erronea: ")
    console.log(rta)
}

//Elimino direccion inexistente
async function testEliminarDireccionFallido(cli, token){    
    let rta = await cli.eliminarDireccion(1234125, 23234234, token)
    console.log("\nEliminar Direccion Erroneo:")    
    console.log(rta)
}

async function main(){  

    const tests = [
        testObtenerTodos,
        testObtenerDireccionesPorIdUsuario,
        testAgregarDireccion,
        testModificarDireccion,
        testEliminarDireccion,
        testObtenerDireccionesPorIdUsuarioFallido,
        testAgregarDireccionFallido,
        testModificarDireccionFallido,
        testModificarDireccionFallido2,
        testEliminarDireccionFallido
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