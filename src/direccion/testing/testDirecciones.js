import crearServidor from '../../config/server.js'
import crearCliente from '../testing/clienteDirecciones.js'

/*-------------------------------
------------Positivos------------
-------------------------------*/

async function testObtenerTodos(cli){
    console.log("\n----------------------------")
    console.log("\nCOMIENZAN PRUEBAS POSITIVAS: ")
    console.log("\n----------------------------")
    let rta = await cli.obtenerTodos()
    console.log("\nObtener todos las direcciones: ")
    console.log(rta)
}

async function testObtenerDireccionesPorIdUsuario(cli){
    let rta = await cli.obtenerDireccionesPorUsuario(1)
    console.log("\nBusqueda Direccion por Id: ")
    console.log(rta)
}

async function testAgregarDireccion(cli){
    let direccion =  {
        id_usuario: 4,
        id_direccion: 5,
        calle: 'El Chingolo',
        numero: 1144,
        cp: '6700',
        provincia: 'Buenos Aires',
        localidad: 'Lujan'
    }
    let rta = await cli.agregarDireccion(direccion)
    console.log("\nDireccion Agregada: ")
    console.log(rta)
}

async function testModificarDireccion(cli){
    let direccion =  {
        id_usuario: 4,
        id_direccion: 5,
        calle: 'El Chingolito',
        numero: 1155,
        cp: '6700',
        provincia: 'Buenos Aires',
        localidad: 'Lujan'
    }
    let rta = await cli.modificarDireccion(direccion.id_usuario, direccion.id_direccion, direccion)
    console.log("\nModificar Direccion: ")
    console.log(rta)
}

async function testEliminarDireccion(cli){    
    let rta = await cli.eliminarDireccion(4, 5)
    console.log("\nEliminar Direccion:")    
    console.log(rta)
}

/*------------------------------
------------Fallidos------------
------------------------------*/

//Busco por ID inexistente
async function testObtenerDireccionesPorIdUsuarioFallido(cli){
    console.log("\n----------------------------")
    console.log("\nCOMIENZAN PRUEBAS FALLIDAS: ")
    console.log("\n----------------------------")
    let rta = await cli.obtenerDireccionesPorUsuario(12341234)
    console.log("\nBusqueda direccion por Id Erroneo: ")
    console.log(rta)
}

//Agrego con id_direccion existente
async function testAgregarDireccionFallido(cli){
    let direccion =  {
        id_usuario: 4,
        id_direccion: 2,
        calle: 'El Chingolito',
        numero: 1155,
        cp: '6700',
        provincia: 'Buenos Aires',
        localidad: 'Lujan'
    }
    let rta = await cli.agregarDireccion(direccion)
    console.log("\nDireccion Erroneo: ")
    console.log(rta)
}

// Modifico Direccion inexistente
async function testModificarDireccionFallido(cli){
    let direccion =  {
        id_usuario: 234,
        id_direccion: 50,
        calle: 'El Chingolito',
        numero: 1155,
        cp: '6700',
        provincia: 'Buenos Aires',
        localidad: 'Lujan'
    }
    let rta = await cli.modificarDireccion(direccion.id_usuario, direccion.id_direccion, direccion)
    console.log("\nModificar direccion Incorrecta: ")
    console.log(rta)
}

// Modifico direccion de forma erronea
async function testModificarDireccionFallido2(cli){
    let direccion =  {
        id_usuario: 4,
        id_direccion: 1,
        calle: 'El Chingolito',
        numero: '1155sdfgs',
        cp: '6700',
        provincia: 'Buenos Aires',
        localidad: 'Lujan'
    }
    let rta = await cli.modificarDireccion(direccion.id_usuario, direccion.id_direccion, direccion)
    console.log("\nModificar direccion Erronea: ")
    console.log(rta)
}

//Elimino direccion inexistente
async function testEliminarDireccionFallido(cli){    
    let rta = await cli.eliminarDireccion(1234125, 23234234)
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