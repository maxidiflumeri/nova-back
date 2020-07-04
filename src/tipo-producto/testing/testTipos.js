//DEV BY EZE LABORANTI
import crearServidor from '../../config/server.js'
import crearCliente from './clientTipos.js'
import config from '../../config/config.js'

let incremental = 10

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

async function testObtenerTodos(cli, token) { //TEST OBTENER TODOS LOS TIPOS DE PRODUCTO
    let rta = await cli.obtenerTodos(token)
    console.log("\nTEST OBTENER TODOS LOS TIPOS DE PRODUCTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorId(cli, token) { //TEST OBTENER TIPOS DE PRODUCTO POR ID
    let rta = await cli.obtenerPorId(9, token)
    console.log("\nTEST OBTENER TIPOS DE PRODUCTO POR ID")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorIdFallido(cli, token) { //TEST ERROR OBTENER TIPOS DE PRODUCTO POR ID
    let rta = await cli.obtenerPorIdFallido(9, token)
    console.log("\nTEST ERROR OBTENER TIPOS DE PRODUCTO POR ID")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorDescripcion(cli, token) { //TEST OBTENER TIPOS DE PRODUCTO POR DESCRIPCION
    let rta = await cli.obtenerPorDescripcion('MOT', token)
    console.log("\nTEST OBTENER TIPOS DE PRODUCTO POR DESCRIPCION")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorDescripcionFallido(cli, token) { //TEST ERROR OBTENER TIPOS DE PRODUCTO POR DESCRIPCION
    let rta = await cli.obtenerPorDescripcionFallido('MOT', token)
    console.log("\nTEST ERROR OBTENER TIPOS DE PRODUCTO POR DESCRIPCION")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregar(cli, token) { //TEST AGREGAR TIPO DE PRODUCTO
    let tipo = {
        descripcion: 'Test agregar'
    }
    let rta = await cli.agregar(tipo, token)
    console.log("\nTEST AGREGAR TIPO DE PRODUCTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregarFallidoDuplicado(cli, token) { //TEST AGREGAR TIPO DE PRODUCTO - ERROR CLAVES DUPLICADAS
    let tipo = {
        descripcion: 'Test agregar'
    }
    let rta = await cli.agregar(tipo, token)
    console.log("\nTEST AGREGAR TIPO DE PRODUCTO - ERROR CLAVES DUPLICADAS")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregarFallidoBody(cli, token) { //TEST AGREGAR TIPO DE PRODUCTO - ERROR BODY INCORRECTO
    let tipo = {
        descripcion_: 'Test agregar'
    }
    let rta = await cli.agregar(tipo, token)
    console.log("\nTEST AGREGAR TIPO DE PRODUCTO - ERROR BODY INCORRECTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificar(cli, token) { //TEST MODIFICAR TIPO DE PRODUCTO
    let tipo = {
        descripcion: 'Test modificar'
    }
    let rta = await cli.modificar(incremental, tipo, token)
    console.log("\nTEST MODIFICAR TIPO DE PRODUCTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificarFallidoBody(cli, token) { //TEST MODIFICAR TIPO DE PRODUCTO - ERROR BODY INCORRECTO
    let tipo = {
        descripcion_: 'Test modificar'
    }
    let rta = await cli.modificar(incremental, tipo, token)
    console.log("\nTEST MODIFICAR TIPO DE PRODUCTO - ERROR BODY INCORRECTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificarFallidoNoEncontrado(cli, token) { //TEST MODIFICAR TIPO DE PRODUCTO - ERROR NO ENCONTRADO
    let tipo = {
        descripcion: 'Test modificar'
    }
    let rta = await cli.modificar(-1, tipo, token)
    console.log("\nTEST MODIFICAR TIPO DE PRODUCTO - ERROR NO ENCONTRADO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testEliminar(cli, token) { //TEST ELIMINAR TIPO DE PRODUCTO
    let rta = await cli.eliminar(incremental, token)
    console.log("\nTEST ELIMINAR TIPO DE PRODUCTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testEliminarFallidoNoEncontrado(cli, token) { //TEST ELIMINAR TIPO DE PRODUCTO - ERROR NO ENCONTRADO
    let rta = await cli.eliminar(incremental, token)
    console.log("\nTEST ELIMINAR TIPO DE PRODUCTO - ERROR NO ENCONTRADO")
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