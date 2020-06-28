import crearServidor from '../../config/server.js'
import crearCliente from './clientProductos.js'

//TEST Obtener todos los productos
async function testObtenerTodos(cli) {
    let rta = await cli.obtenerTodos()
    console.log("\nObtener todos los productos: ")
    console.log(rta)
}

//TEST Obtener producto por id especifico
async function testobtenerProductoPorId(cli) {
    let rta = await cli.obtenerProductoPorId(1)
    console.log("\nBusqueda por Id Producto: ")
    console.log(rta)
}

//TEST Obtener producto por modelo especifico
async function testobtenerProductoPorModelo(cli) {
    let rta = await cli.obtenerProductoPorModelo('i7')
    console.log("\nBusqueda por Modelo: ")
    console.log(rta)
}

//TEST Obtener producto por id tipo
async function testobtenerProductoPorIdTipo(cli) {
    let rta = await cli.obtenerProductoPorIdTipo(1)
    console.log("\nBusqueda de producto por IdTipo: ")
    console.log(rta)
}

//TEST Obtener producto por IDMarca
async function testobtenerProductoPorIdMarca(cli) {
    let rta = await cli.obtenerProductoPorIdMarca(3)
    console.log("\nBusqueda de producto por IdMarca: ")
    console.log(rta)
}
//TEST Agregar Producto
async function testAgregarProducto(cli) {
    console.log("\nAgregar Producto:")
    let producto =
    {
        ID_TIPO: 1,
        ID_MARCA: 3,
        MODELO: 'I1 400',
        DESCRIPCION: 'Microprocesador Intel i1 400',
        STOCK: 5,
        PRECIO: 15000,
        CANT_VISITAS: 0

    }
    let rta = await cli.agregarProducto(producto)

}

//TEST Modificar Producto
async function testModificarProducto(cli) {
    console.log("\nModificar Producto: ")
    let producto = {
        ID_TIPO: 1,
        ID_MARCA: 3,
        MODELO: 'I2 200',
        DESCRIPCION: 'Microprocesador Intel i2 200',
        STOCK: 1,
        PRECIO: 500,
        CANT_VISITAS: 0,
        FECHA_INGRESO: '2020-06-16T00:00:00.000Z'
    }
    let rta = await cli.modificarProducto(20, producto)

}
//TEST Eliminar Producto por id
async function testEliminarProducto(cli) {
    let rta = await cli.eliminarProducto(20)
    console.log("\nEliminar producto:")
    console.log(rta)
    console.log("\nproducto Eliminado:")
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
        testEliminarProducto
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