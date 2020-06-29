//DEV BY EZE LABORANTI
import crearServidor from '../../config/server.js'
import crearCliente from './clientMarcas.js'

let incremental = 12

async function testObtenerTodos(cli) { //TEST OBTENER TODOS LAS MARCAS
    let rta = await cli.obtenerTodos()
    console.log("\nTEST OBTENER TODOS LAS MARCAS")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorId(cli) { //TEST OBTENER MARCAS POR ID
    let rta = await cli.obtenerPorId(9)
    console.log("\nTEST OBTENER MARCAS POR ID")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorIdFallido(cli) { //TEST ERROR OBTENER MARCAS POR ID
    let rta = await cli.obtenerPorIdFallido(9)
    console.log("\nTEST ERROR OBTENER MARCAS POR ID")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorDescripcion(cli) { //TEST OBTENER MARCAS POR DESCRIPCION
    let rta = await cli.obtenerPorDescripcion('MICRO')
    console.log("\nTEST OBTENER MARCAS POR DESCRIPCION")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorDescripcionFallido(cli) { //TEST ERROR OBTENER MARCAS POR DESCRIPCION
    let rta = await cli.obtenerPorDescripcionFallido('MICRO')
    console.log("\nTEST ERROR OBTENER MARCAS POR DESCRIPCION")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregar(cli) { //TEST AGREGAR MARCA
    let marca = {
        descripcion: 'Test agregar'
    }
    let rta = await cli.agregar(marca)
    console.log("\nTEST AGREGAR MARCA")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregarFallidoDuplicado(cli) { //TEST AGREGAR MARCA - ERROR CLAVES DUPLICADAS
    let marca = {
        descripcion: 'Test agregar'
    }
    let rta = await cli.agregar(marca)
    console.log("\nTEST AGREGAR MARCA - ERROR CLAVES DUPLICADAS")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregarFallidoBody(cli) { //TEST AGREGAR MARCA - ERROR BODY INCORRECTO
    let marca = {
        descripcion_: 'Test agregar'
    }
    let rta = await cli.agregar(marca)
    console.log("\nTEST AGREGAR MARCA - ERROR BODY INCORRECTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificar(cli) { //TEST MODIFICAR MARCA
    let marca = {
        descripcion: 'Test modificar'
    }
    let rta = await cli.modificar(incremental, marca)
    console.log("\nTEST MODIFICAR MARCA")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificarFallidoBody(cli) { //TEST MODIFICAR MARCA - ERROR BODY INCORRECTO
    let marca = {
        descripcion_: 'Test modificar'
    }
    let rta = await cli.modificar(incremental, marca)
    console.log("\nTEST MODIFICAR MARCA - ERROR BODY INCORRECTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificarFallidoNoEncontrado(cli) { //TEST MODIFICAR MARCA - ERROR NO ENCONTRADO
    let marca = {
        descripcion: 'Test modificar'
    }
    let rta = await cli.modificar(-1, marca)
    console.log("\nTEST MODIFICAR MARCA - ERROR NO ENCONTRADO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testEliminar(cli) { //TEST ELIMINAR MARCA
    let rta = await cli.eliminar(incremental)
    console.log("\nTEST ELIMINAR MARCA")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testEliminarFallidoNoEncontrado(cli) { //TEST ELIMINAR MARCA - ERROR NO ENCONTRADO
    let rta = await cli.eliminar(incremental)
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
    const url = 'http://localhost'
    const PORT = 8080
    const server = app.listen(PORT, async () => {
        console.log(`Servidor express escuchando en el puerto ${PORT}`)
        const actualPort = server.address().port
        const cli = crearCliente(url, actualPort)

        for (const test of tests) {
            await test(cli)
        }
    })
}

main()