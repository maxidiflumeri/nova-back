//DEV BY EZE LABORANTI
import crearServidor from '../../config/server.js'
import crearCliente from './clientMarcas.js'
import config from '../../config/config.js'

let incremental = 12

async function testLogin(cli) {
    // ES ADMIN
    // let usuario = {
    //     usuario: 'santucastro@live.com.ar',
    //     password: '12345'
    // }
    // NO ES ADMIN
    let usuario = {
        usuario: 'ezelaboranti@hotmail.com',
        password: '1234'
    }
    let rta = await cli.login(usuario)
    return rta.token
}

async function testObtenerTodos(cli, token) { //TEST OBTENER TODOS LAS MARCAS
    let rta = await cli.obtenerTodos(token)
    console.log("\nTEST OBTENER TODOS LAS MARCAS")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorId(cli, token) { //TEST OBTENER MARCAS POR ID
    let rta = await cli.obtenerPorId(9, token)
    console.log("\nTEST OBTENER MARCAS POR ID")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorIdFallido(cli, token) { //TEST ERROR OBTENER MARCAS POR ID
    let rta = await cli.obtenerPorIdFallido(9, token)
    console.log("\nTEST ERROR OBTENER MARCAS POR ID")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorDescripcion(cli, token) { //TEST OBTENER MARCAS POR DESCRIPCION
    let rta = await cli.obtenerPorDescripcion('MICRO', token)
    console.log("\nTEST OBTENER MARCAS POR DESCRIPCION")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorDescripcionFallido(cli, token) { //TEST ERROR OBTENER MARCAS POR DESCRIPCION
    let rta = await cli.obtenerPorDescripcionFallido('MICRO', token)
    console.log("\nTEST ERROR OBTENER MARCAS POR DESCRIPCION")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregar(cli, token) { //TEST AGREGAR MARCA
    let marca = {
        descripcion: 'Test agregar'
    }
    let rta = await cli.agregar(marca, token)
    console.log("\nTEST AGREGAR MARCA")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregarFallidoDuplicado(cli, token) { //TEST AGREGAR MARCA - ERROR CLAVES DUPLICADAS
    let marca = {
        descripcion: 'Test agregar'
    }
    let rta = await cli.agregar(marca, token)
    console.log("\nTEST AGREGAR MARCA - ERROR CLAVES DUPLICADAS")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregarFallidoBody(cli, token) { //TEST AGREGAR MARCA - ERROR BODY INCORRECTO
    let marca = {
        descripcion_: 'Test agregar'
    }
    let rta = await cli.agregar(marca, token)
    console.log("\nTEST AGREGAR MARCA - ERROR BODY INCORRECTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificar(cli, token) { //TEST MODIFICAR MARCA
    let marca = {
        descripcion: 'Test modificar'
    }
    let rta = await cli.modificar(incremental, marca, token)
    console.log("\nTEST MODIFICAR MARCA")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificarFallidoBody(cli, token) { //TEST MODIFICAR MARCA - ERROR BODY INCORRECTO
    let marca = {
        descripcion_: 'Test modificar'
    }
    let rta = await cli.modificar(incremental, marca, token)
    console.log("\nTEST MODIFICAR MARCA - ERROR BODY INCORRECTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificarFallidoNoEncontrado(cli, token) { //TEST MODIFICAR MARCA - ERROR NO ENCONTRADO
    let marca = {
        descripcion: 'Test modificar'
    }
    let rta = await cli.modificar(-1, marca, token)
    console.log("\nTEST MODIFICAR MARCA - ERROR NO ENCONTRADO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testEliminar(cli, token) { //TEST ELIMINAR MARCA
    let rta = await cli.eliminar(incremental, token)
    console.log("\nTEST ELIMINAR MARCA")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testEliminarFallidoNoEncontrado(cli, token) { //TEST ELIMINAR MARCA - ERROR NO ENCONTRADO
    let rta = await cli.eliminar(incremental, token)
    console.log("\nTEST ELIMINAR MARCA - ERROR NO ENCONTRADO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function main() {
    const tests = [
        testObtenerTodos,
        testObtenerPorId,
        testObtenerPorIdFallido,
        testObtenerPorDescripcion,
        testObtenerPorDescripcionFallido,
        testAgregar,
        testAgregarFallidoDuplicado,
        testAgregarFallidoBody,
        testModificar,
        testModificarFallidoBody,
        testModificarFallidoNoEncontrado,
        testEliminar,
        testEliminarFallidoNoEncontrado
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