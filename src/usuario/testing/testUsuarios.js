//TOMAS MELENDEZ
import crearServidor from '../../config/server.js'
import crearCliente from '../testing/clientUsuarios.js'
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
    console.log("\nObtener todos los usuarios: ")
    console.log(rta)
}

async function testObtenerUsuarioPorId(cli, token){
    let rta = await cli.obtenerUsuarioPorId(1, token)
    console.log("\nBusqueda usuario por Id: ")
    console.log(rta)
}

async function testAgregarUsuario(cli, token){
    let usuario =  {
        id_usuario: 5,
        nombre: 'Ana',
        apellido: 'Mignone',
        correo: 'anita@gmail.com',
        clave: '1234',
        administrador: 'n',
        fecha_nacimiento: '1996-01-23',
        sexo: 'f',
        direccion: {
            id_direccion: 1,
            calle: 'El Chingolo',
            numero: 1144,
            cp: '6700',
            provincia: 'Buenos Aires',
            localidad: 'Lujan'
        },
        telefonos: [
            {
                telefono : 2323672973,
                descripcion: 'Celular'
            }
        ]
    }
    let rta = await cli.agregarUsuario(usuario, token)
    console.log("\nUsuario Agregado: ")
    console.log(rta)
}

async function testModificarUsuario(cli, token){
    let usuario =  {
        id_usuario: 5,
        nombre: 'Ana Julia',
        apellido: 'Mignone',
        correo: 'anita@gmail.com',
        clave: '1234',
        administrador: 'n',
        fecha_nacimiento: '1996-01-23',
        sexo: 'f'
    }
    let rta = await cli.modificarUsuario(5, usuario, token)
    console.log("\nModificar Usuario: ")
    console.log(rta)
}

async function testEliminarUsuario(cli, token){    
    let rta = await cli.eliminarUsuario(5, token)
    console.log("\nEliminar Usuario:")    
    console.log(rta)
}

/*------------------------------
------------Fallidos------------
------------------------------*/

//Busco por ID inexistente
async function testObtenerUsuarioPorIdFallido(cli, token){
    console.log("\n----------------------------")
    console.log("\nCOMIENZAN PRUEBAS FALLIDAS: ")
    console.log("\n----------------------------")
    let rta = await cli.obtenerUsuarioPorId(12341234, token)
    console.log("\nBusqueda usuario por Id Erroneo: ")
    console.log(rta)
}

//Agrego con clave y email invalida
async function testAgregarUsuarioFallido(cli, token){
    let usuario =  {
        id_usuario: 5,
        nombre: 'Ana',
        apellido: 'Mignone',
        correo: 'anita',
        clave: 1234,
        administrador: 'n',
        fecha_nacimiento: '1996-01-23',
        sexo: 'f',
        direccion: {
            id_direccion: 1,
            calle: 'El Chingolo',
            numero: 1144,
            cp: '6700',
            provincia: 'Buenos Aires',
            localidad: 'Lujan'
        },
        telefonos: [
            {
                telefono : 2323672973,
                descripcion: 'Celular'
            }
        ]
    }
    let rta = await cli.agregarUsuario(usuario, token)
    console.log("\nUsuario Erroneo: ")
    console.log(rta)
}

// Modifico Usuario inexistente
async function testModificarUsuarioFallido(cli, token){
    let usuario =  {
        id_usuario: 12344,
        nombre: 'Ana Julia',
        apellido: 'Mignone',
        correo: 'anita@gmail.com',
        clave: '1234',
        administrador: 'n',
        fecha_nacimiento: '1996-01-23',
        sexo: 'f'
    }
    let rta = await cli.modificarUsuario(5, usuario, token)
    console.log("\nModificar con IDUsuario Incorrecto: ")
    console.log(rta)
}

// Modifico Usuario de forma erronea
async function testModificarUsuarioFallido2(cli, token){
    let usuario =  {
        id_usuario: 5,
        nombre: 'Ana Julia',
        apellido: 'Mignone',
        correo: 'anita',
        clave: '1234',
        administrador: 'n',
        fecha_nacimiento: '1996-01-23',
        sexo: 'f'
    }
    let rta = await cli.modificarUsuario(5, usuario, token)
    console.log("\nModificar Usuario Erroneo: ")
    console.log(rta)
}

//Elimino usuario inexistente
async function testEliminarUsuarioFallido(cli, token){    
    let rta = await cli.eliminarUsuario(1234125, token)
    console.log("\nEliminar Usuario Erroneo:")    
    console.log(rta)
}

async function main(){  

    const tests = [
        testObtenerTodos,
        testObtenerUsuarioPorId,
        testAgregarUsuario,
        testModificarUsuario,
        testEliminarUsuario,
        testObtenerUsuarioPorIdFallido,
        testAgregarUsuarioFallido,
        testModificarUsuarioFallido,
        testModificarUsuarioFallido2,
        testEliminarUsuarioFallido
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