//DEV BY EZE LABORANTI
import crearServidor from '../../config/server.js'
import crearCliente from './clientEstados.js'


async function testObtenerTodos(cli) { //TEST OBTENER TODOS LOS ESTADOS
    let rta = await cli.obtenerTodos()
    console.log("\nTEST OBTENER TODOS LOS ESTADOS")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorId(cli) { //TEST OBTENER ESTADOS POR ID
    let rta = await cli.obtenerPorId('I')
    console.log("\nTEST OBTENER ESTADOS POR ID")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorIdFallido(cli) { //TEST ERROR OBTENER ESTADOS POR ID
    let rta = await cli.obtenerPorIdFallido(10)
    console.log("\nTEST ERROR OBTENER ESTADOS POR ID")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorDescripcion(cli) { //TEST OBTENER ESTADOS POR DESCRIPCION
    let rta = await cli.obtenerPorDescripcion('cance')
    console.log("\nTEST OBTENER ESTADOS POR DESCRIPCION")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorDescripcionFallido(cli) { //TEST ERROR OBTENER ESTADOS POR DESCRIPCION
    let rta = await cli.obtenerPorDescripcionFallido('cance')
    console.log("\nTEST ERROR OBTENER ESTADOS POR DESCRIPCION")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregar(cli) { //TEST AGREGAR ESTADO
    let estado = {
        id_estado: 'T',
        descripcion: 'Test agregar'
    }
    let rta = await cli.agregar(estado)
    console.log("\nTEST AGREGAR ESTADO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregarFallidoDuplicado(cli) { //TEST AGREGAR ESTADO - ERROR CLAVES DUPLICADAS
    let estado = {
        id_estado: 'T',
        descripcion: 'Test agregar'
    }
    let rta = await cli.agregar(estado)
    console.log("\nTEST AGREGAR ESTADO - ERROR CLAVES DUPLICADAS")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregarFallidoBody(cli) { //TEST AGREGAR ESTADO - ERROR BODY INCORRECTO
    let estado = {
        id_estado: 'TEST',
        descripcion: 'Test agregar'
    }
    let rta = await cli.agregar(estado)
    console.log("\nTEST AGREGAR ESTADO - ERROR BODY INCORRECTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificar(cli) { //TEST MODIFICAR ESTADO
    let estado = {
        id_estado: 'T',
        descripcion: 'Test modificar'
    }
    let rta = await cli.modificar('T', estado)
    console.log("\nTEST MODIFICAR ESTADO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificarFallidoBody(cli) { //TEST MODIFICAR ESTADO - ERROR BODY INCORRECTO
    let estado = {
        id_estado: 'TEST',
        descripcion: 'Test modificar'
    }
    let rta = await cli.modificar('T', estado)
    console.log("\nTEST MODIFICAR ESTADO - ERROR BODY INCORRECTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificarFallidoNoEncontrado(cli) { //TEST MODIFICAR ESTADO - ERROR NO ENCONTRADO
    let estado = {
        id_estado: 'Z',
        descripcion: 'Test modificar'
    }
    let rta = await cli.modificar('Z', estado)
    console.log("\nTEST MODIFICAR ESTADO - ERROR NO ENCONTRADO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testEliminar(cli) { //TEST ELIMINAR ESTADO
    let rta = await cli.eliminar('T')
    console.log("\nTEST ELIMINAR ESTADO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testEliminarFallidoNoEncontrado(cli) { //TEST ELIMINAR ESTADO - ERROR NO ENCONTRADO
    let rta = await cli.eliminar('T')
    console.log("\nTEST ELIMINAR ESTADO - ERROR NO ENCONTRADO")
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