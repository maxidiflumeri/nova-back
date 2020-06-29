import crearServidor from '../../config/server.js'
import crearCliente from '../testing/clientUsuarios.js'

/*-------------------------------
------------Positivos------------
-------------------------------*/

async function testObtenerTodos(cli){
    console.log("\n----------------------------")
    console.log("\nCOMIENZAN PRUEBAS POSITIVAS: ")
    console.log("\n----------------------------")
    let rta = await cli.obtenerTodos()
    console.log("\nObtener todos los usuarios: ")
    console.log(rta)
}

async function testObtenerUsuarioPorId(cli){
    let rta = await cli.obtenerUsuarioPorId(1)
    console.log("\nBusqueda usuario por Id: ")
    console.log(rta)
}

async function testAgregarUsuario(cli){
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
    let rta = await cli.agregarUsuario(usuario)
    console.log("\nUsuario Agregado: ")
    console.log(rta)
}

async function testModificarUsuario(cli){
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
    let rta = await cli.modificarUsuario(5, usuario)
    console.log("\nModificar Usuario: ")
    console.log(rta)
}

async function testEliminarUsuario(cli){    
    let rta = await cli.eliminarUsuario(5)
    console.log("\nEliminar Usuario:")    
    console.log(rta)
}

/*------------------------------
------------Fallidos------------
------------------------------*/

//Busco por ID inexistente
async function testObtenerUsuarioPorIdFallido(cli){
    console.log("\n----------------------------")
    console.log("\nCOMIENZAN PRUEBAS FALLIDAS: ")
    console.log("\n----------------------------")
    let rta = await cli.obtenerUsuarioPorId(12341234)
    console.log("\nBusqueda usuario por Id Erroneo: ")
    console.log(rta)
}

//Agrego con clave y email invalida
async function testAgregarUsuarioFallido(cli){
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
    let rta = await cli.agregarUsuario(usuario)
    console.log("\nUsuario Erroneo: ")
    console.log(rta)
}

// Modifico Usuario inexistente
async function testModificarUsuarioFallido(cli){
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
    let rta = await cli.modificarUsuario(5, usuario)
    console.log("\nModificar Usuario Incorrecto: ")
    console.log(rta)
}

// Modifico Usuario de forma erronea
async function testModificarUsuarioFallido2(cli){
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
    let rta = await cli.modificarUsuario(5, usuario)
    console.log("\nModificar Usuario Erroneo: ")
    console.log(rta)
}

//Elimino usuario inexistente
async function testEliminarUsuarioFallido(cli){    
    let rta = await cli.eliminarUsuario(1234125)
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