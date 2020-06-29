//DEV BY EZE LABORANTI
import crearServidor from '../../config/server.js'
import crearCliente from './clientTipos.js'

let incremental = 10

async function testObtenerTodos(cli) { //TEST OBTENER TODOS LOS TIPOS DE PRODUCTO
    let rta = await cli.obtenerTodos()
    console.log("\nTEST OBTENER TODOS LOS TIPOS DE PRODUCTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorId(cli) { //TEST OBTENER TIPOS DE PRODUCTO POR ID
    let rta = await cli.obtenerPorId(9)
    console.log("\nTEST OBTENER TIPOS DE PRODUCTO POR ID")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorIdFallido(cli) { //TEST ERROR OBTENER TIPOS DE PRODUCTO POR ID
    let rta = await cli.obtenerPorIdFallido(9)
    console.log("\nTEST ERROR OBTENER TIPOS DE PRODUCTO POR ID")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorDescripcion(cli) { //TEST OBTENER TIPOS DE PRODUCTO POR DESCRIPCION
    let rta = await cli.obtenerPorDescripcion('MOT')
    console.log("\nTEST OBTENER TIPOS DE PRODUCTO POR DESCRIPCION")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorDescripcionFallido(cli) { //TEST ERROR OBTENER TIPOS DE PRODUCTO POR DESCRIPCION
    let rta = await cli.obtenerPorDescripcionFallido('MOT')
    console.log("\nTEST ERROR OBTENER TIPOS DE PRODUCTO POR DESCRIPCION")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregar(cli) { //TEST AGREGAR TIPO DE PRODUCTO
    let tipo = {
        descripcion: 'Test agregar'
    }
    let rta = await cli.agregar(tipo)
    console.log("\nTEST AGREGAR TIPO DE PRODUCTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregarFallidoDuplicado(cli) { //TEST AGREGAR TIPO DE PRODUCTO - ERROR CLAVES DUPLICADAS
    let tipo = {
        descripcion: 'Test agregar'
    }
    let rta = await cli.agregar(tipo)
    console.log("\nTEST AGREGAR TIPO DE PRODUCTO - ERROR CLAVES DUPLICADAS")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregarFallidoBody(cli) { //TEST AGREGAR TIPO DE PRODUCTO - ERROR BODY INCORRECTO
    let tipo = {
        descripcion_: 'Test agregar'
    }
    let rta = await cli.agregar(tipo)
    console.log("\nTEST AGREGAR TIPO DE PRODUCTO - ERROR BODY INCORRECTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificar(cli) { //TEST MODIFICAR TIPO DE PRODUCTO
    let tipo = {
        descripcion: 'Test modificar'
    }
    let rta = await cli.modificar(incremental, tipo)
    console.log("\nTEST MODIFICAR TIPO DE PRODUCTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificarFallidoBody(cli) { //TEST MODIFICAR TIPO DE PRODUCTO - ERROR BODY INCORRECTO
    let tipo = {
        descripcion_: 'Test modificar'
    }
    let rta = await cli.modificar(incremental, tipo)
    console.log("\nTEST MODIFICAR TIPO DE PRODUCTO - ERROR BODY INCORRECTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificarFallidoNoEncontrado(cli) { //TEST MODIFICAR TIPO DE PRODUCTO - ERROR NO ENCONTRADO
    let tipo = {
        descripcion: 'Test modificar'
    }
    let rta = await cli.modificar(-1, tipo)
    console.log("\nTEST MODIFICAR TIPO DE PRODUCTO - ERROR NO ENCONTRADO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testEliminar(cli) { //TEST ELIMINAR TIPO DE PRODUCTO
    let rta = await cli.eliminar(incremental)
    console.log("\nTEST ELIMINAR TIPO DE PRODUCTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testEliminarFallidoNoEncontrado(cli) { //TEST ELIMINAR TIPO DE PRODUCTO - ERROR NO ENCONTRADO
    let rta = await cli.eliminar(incremental)
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