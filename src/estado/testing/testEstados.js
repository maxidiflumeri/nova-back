//DEV BY EZE LABORANTI
import crearServidor from '../../config/server.js'
import crearCliente from './clientEstados.js'
import config from '../../config/config.js'

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

async function testObtenerTodos(cli, token) { //TEST OBTENER TODOS LOS ESTADOS
    let rta = await cli.obtenerTodos(token)
    console.log("\nTEST OBTENER TODOS LOS ESTADOS")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorId(cli, token) { //TEST OBTENER ESTADOS POR ID
    let rta = await cli.obtenerPorId('I', token)
    console.log("\nTEST OBTENER ESTADOS POR ID")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorIdFallido(cli, token) { //TEST ERROR OBTENER ESTADOS POR ID
    let rta = await cli.obtenerPorIdFallido(10, token)
    console.log("\nTEST ERROR OBTENER ESTADOS POR ID")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorDescripcion(cli, token) { //TEST OBTENER ESTADOS POR DESCRIPCION
    let rta = await cli.obtenerPorDescripcion('cance', token)
    console.log("\nTEST OBTENER ESTADOS POR DESCRIPCION")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testObtenerPorDescripcionFallido(cli, token) { //TEST ERROR OBTENER ESTADOS POR DESCRIPCION
    let rta = await cli.obtenerPorDescripcionFallido('cance', token)
    console.log("\nTEST ERROR OBTENER ESTADOS POR DESCRIPCION")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregar(cli, token) { //TEST AGREGAR ESTADO
    let estado = {
        id_estado: 'T',
        descripcion: 'Test agregar'
    }
    let rta = await cli.agregar(estado, token)
    console.log("\nTEST AGREGAR ESTADO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregarFallidoDuplicado(cli, token) { //TEST AGREGAR ESTADO - ERROR CLAVES DUPLICADAS
    let estado = {
        id_estado: 'T',
        descripcion: 'Test agregar'
    }
    let rta = await cli.agregar(estado, token)
    console.log("\nTEST AGREGAR ESTADO - ERROR CLAVES DUPLICADAS")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testAgregarFallidoBody(cli, token) { //TEST AGREGAR ESTADO - ERROR BODY INCORRECTO
    let estado = {
        id_estado: 'TEST',
        descripcion: 'Test agregar'
    }
    let rta = await cli.agregar(estado, token)
    console.log("\nTEST AGREGAR ESTADO - ERROR BODY INCORRECTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificar(cli, token) { //TEST MODIFICAR ESTADO
    let estado = {
        id_estado: 'T',
        descripcion: 'Test modificar'
    }
    let rta = await cli.modificar('T', estado, token)
    console.log("\nTEST MODIFICAR ESTADO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificarFallidoBody(cli, token) { //TEST MODIFICAR ESTADO - ERROR BODY INCORRECTO
    let estado = {
        id_estado: 'TEST',
        descripcion: 'Test modificar'
    }
    let rta = await cli.modificar('T', estado, token)
    console.log("\nTEST MODIFICAR ESTADO - ERROR BODY INCORRECTO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testModificarFallidoNoEncontrado(cli, token) { //TEST MODIFICAR ESTADO - ERROR NO ENCONTRADO
    let estado = {
        id_estado: 'Z',
        descripcion: 'Test modificar'
    }
    let rta = await cli.modificar('Z', estado, token)
    console.log("\nTEST MODIFICAR ESTADO - ERROR NO ENCONTRADO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testEliminar(cli, token) { //TEST ELIMINAR ESTADO
    let rta = await cli.eliminar('T', token)
    console.log("\nTEST ELIMINAR ESTADO")
    console.log(rta)
    console.log("\n---------------------------")
}

async function testEliminarFallidoNoEncontrado(cli, token) { //TEST ELIMINAR ESTADO - ERROR NO ENCONTRADO
    let rta = await cli.eliminar('T', token)
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