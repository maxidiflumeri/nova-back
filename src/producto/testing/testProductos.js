import crearServidor from '../../config/server.js'
import crearCliente from './clientProductos.js'
import config from '../../config/config.js'


async function testLogin(cli) {
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

//TEST OK - Obtener todos los productos
async function testObtenerTodos(cli) {
    let rta = await cli.obtenerTodos()
    console.log("\nObtener todos los productos: ")
    console.log(rta)
}

//TEST OK - Obtener producto por id especifico
async function testobtenerProductoPorId(cli) {
    let rta = await cli.obtenerProductoPorId(1)

    console.log("\nBusqueda por Id Producto: ")
    console.log(rta)
}

//TEST FALLIDO - Obtener producto por id especifico
async function testobtenerProductoPorIdErroneo(cli) {
    let rta = await cli.obtenerProductoPorId(100)
    console.log("\n*******Test Fallidos:****** ")
    console.log("\nTest Fallido Busqueda por Id Producto: ")
    console.log(rta)
}

//TEST OK - Obtener producto por modelo especifico
async function testobtenerProductoPorModelo(cli) {
    let rta = await cli.obtenerProductoPorModelo('i7')
    console.log("\nBusqueda por Modelo: ")
    console.log(rta)
}

//TEST FALLIDO - Obtener producto por modelo especifico
async function testobtenerProductoPorModeloErroneo(cli) {
    let rta = await cli.obtenerProductoPorModelo('i7000000000')
    console.log("\nTest Fallido Busqueda por Modelo: ")
    console.log(rta)
}

//TEST OK - Obtener producto por id tipo
async function testobtenerProductoPorIdTipo(cli) {
    let rta = await cli.obtenerProductoPorIdTipo(3)
    console.log("\nBusqueda de producto por IdTipo: ")
    console.log(rta)
}

//TEST FALLIDO - Obtener producto por id tipo
async function testobtenerProductoPorIdTipoErroneo(cli) {
    let rta = await cli.obtenerProductoPorIdTipo(100000)
    console.log("\nTest Fallido Busqueda de producto por IdTipo: ")
    console.log(rta)
}

//TEST OK - Obtener producto por IDMarca
async function testobtenerProductoPorIdMarca(cli) {
    let rta = await cli.obtenerProductoPorIdMarca(4)
    console.log("\nBusqueda de producto por IdMarca: ")
    console.log(rta)
}

//TEST FALLIDO - Obtener producto por IDMarca
async function testobtenerProductoPorIdMarcaErroneo(cli) {
    let rta = await cli.obtenerProductoPorIdMarca(30000)
    console.log("\nTest Fallido Busqueda de producto por IdMarca: ")
    console.log(rta)
}

//TEST OK - Agregar Producto
async function testAgregarProducto(cli, token) {
    console.log("\nAgregar Producto:")
    let producto =
    {
        ID_TIPO: 1,
        ID_MARCA: 3,
        MODELO: 'I40 400',
        DESCRIPCION: 'Microprocesador Intel i40 400',
        STOCK: 5,
        PRECIO: 15000,
        CANT_VISITAS: 0,
        FOTO1: 'vacio',
        FOTO2: 'vacio',
        FOTO3: 'vacio'

    }
    let rta = await cli.agregarProducto(producto, token)

}

//TEST FALLIDO - Agregar Producto --> No se envia descripcion
async function testAgregarProductoErroneo(cli, token) {
    console.log("\nTest Fallido Agregar Producto:")
    let producto =
    {
        ID_TIPO: 1,
        ID_MARCA: 3,
        MODELO: 'I7 7700K',
        DESCRIPCION: 'Microprocesador Intel i7 7700k',
        STOCK: 5,
        PRECIO: 15000,
        CANT_VISITAS: 0

    }
    let rta = await cli.agregarProducto(producto, token)

}

//TEST OK - Modificar Producto
async function testModificarProducto(cli, token) {
    console.log("\nModificar Producto: ")
    let producto = {
        ID_TIPO: 1,
        ID_MARCA: 3,
        MODELO: 'I50 400',
        DESCRIPCION: 'Microprocesador Intel i50 400',
        STOCK: 1,
        PRECIO: 500,
        CANT_VISITAS: 0,
        FECHA_INGRESO: '2020-06-16T00:00:00.000Z'
    }
    let rta = await cli.modificarProducto(79, producto, token)

}

//TEST FALLIDO - Modificar Producto  --> no se envia id tipo y marca y el id producto no existe
async function testModificarProductoErroneo(cli, token) {
    console.log("\nTest Fallido Modificar Producto: ")
    let producto = {
        ID_TIPO: 1000,
        ID_MARCA: 3,
        MODELO: '1211 400',
        DESCRIPCION: 'Microprocesador Intel i1211 400',
        STOCK: 1,
        PRECIO: 500,
        CANT_VISITAS: 0,
        FECHA_INGRESO: '2020-06-16T00:00:00.000Z'
    }
    let rta = await cli.modificarProducto(1, producto, token)

}

//TEST OK - Eliminar Producto por id
async function testEliminarProducto(cli, token) {
    let rta = await cli.eliminarProducto(92,token)
    console.log("\nEliminar producto:")
    console.log(rta)

}


//TEST FALLIDO - Eliminar Producto por id que no existe
async function testEliminarProductoErroneo(cli, token) {
    let rta = await cli.eliminarProducto(150,token)
    console.log("\nTest Fallido Eliminar producto:")
    console.log(rta)

}



async function main() {

    const tests = [
        testObtenerTodos,
        testobtenerProductoPorId,
        testobtenerProductoPorModelo,
        testobtenerProductoPorIdTipo,
        testobtenerProductoPorIdMarca,
        testAgregarProducto,
        testModificarProducto,
        testEliminarProducto,
        testobtenerProductoPorIdErroneo,
        testobtenerProductoPorModeloErroneo,
        testobtenerProductoPorIdTipoErroneo,
        testobtenerProductoPorIdMarcaErroneo,
        testAgregarProductoErroneo,
        testModificarProductoErroneo,
        testEliminarProductoErroneo
    ]


    const app = crearServidor()
    const url = 'http://localhost'
    const PORT = 8080
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