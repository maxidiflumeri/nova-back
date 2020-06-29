// DEV BY MAXIMILIANO ARIEL DI FLUMERI

import crearServidor from '../../config/server.js'
import crearCliente from '../testing/clientPedidos.js'

async function testObtenerTodos(cli){
    let rta = await cli.obtenerTodos()
    console.log("\nObtener todos los Pedidos: ")
    console.log(rta)
}

async function testObtenerPorIdUsuario(cli){
    let rta = await cli.obtenerPorIdUsuario(1)
    console.log("\nBusqueda por Id Usuario: ")
    console.log(rta)
}

async function testObtenerPorIdUsuarioError(cli){
    let rta = await cli.obtenerPorIdUsuario(85)
    console.log("\nBusqueda por Id Usuario: ")
    console.log(rta)
}

async function testobtenerDetallesPorIdPedido(cli){
    let rta = await cli.obtenerDetallesPorIdPedido(54)
    console.log("\nBusqueda de items por Id de Pedido: ")
    console.log(rta)
}

async function testobtenerDetallesPorIdPedidoError(cli){
    let rta = await cli.obtenerDetallesPorIdPedido(85)
    console.log("\nBusqueda de items por Id de Pedido Erroneo: ")
    console.log(rta)
}

async function testobtenerPedidoPorId(cli){
    let rta = await cli.obtenerPedidoPorId(54)
    console.log("\nBusqueda de pedido por Id: ")
    console.log(rta)
}

async function testobtenerPedidoPorIdError(cli){
    let rta = await cli.obtenerPedidoPorIdError(85)
    console.log("\nBusqueda de pedido por Id Error: ")
    console.log(rta)
}

async function testAgregarPedido(cli){
    let pedido =  {
        id_usuario: 4,
        id_direccion: 1,
        importe_total: 0,
        fecha: '2020-06-22',
        id_estado: 'I',
        productos: [
            {
                id_producto: 4,
                cantidad: 2
            },
            {
                id_producto: 6,
                cantidad: 1
            }
        ]
    }
    let rta = await cli.agregarPedido(pedido)
    console.log("\nPedido Agregado: ")
    console.log(rta)
}

async function testAgregarPedidoError(cli){
    let pedido =  {  
        id_usuario: 1,            
        importe_total: 0,
        fecha: '2020-06-22',
        id_estado: 'I',
        productos: [
            {
                id_producto: 4,
                cantidad: 2
            },
            {
                id_producto: 6,
                cantidad: 1
            }
        ]
    }
    let rta = await cli.agregarPedido(pedido)
    console.log("\nPedido Agregado Error: ")
    console.log(rta)
}

async function testModificarPedido(cli){
    let pedido =  {
        id_usuario: 4,
        id_direccion: 1,
        importe_total: 0,
        fecha: '2020-06-22',
        id_estado: 'I',
        productos: [
            {
                id_producto: 2,
                cantidad: 10
            },
            {
                id_producto: 15,
                cantidad: 4
            },
            {
                id_producto: 1,
                cantidad: 2
            }
        ]
    }
    let rta = await cli.modificarPedido(pedido,71)
    console.log("\nModificar Pedido: ")
    console.log(rta)
}

async function testModificarPedidoError(cli){
    let pedido =  {
        id_usuario: 4,
        id_direccion: 1,
        importe_total: 0,
        fecha: '2020-06-22',
        id_estado: 'I',
        productos: [
            {
                id_producto: 2,
                cantidad: 10
            },
            {
                id_producto: 15,
                cantidad: 4
            },
            {
                id_producto: 1,
                cantidad: 2
            }
        ]
    }
    let rta = await cli.modificarPedido(pedido,56)
    console.log("\nModificar Pedido Error: ")
    console.log(rta)
}

async function testEliminarPedido(cli){    
    let rta = await cli.eliminarPedido(71)
    console.log("\nEliminar Pedido:")    
    console.log(rta)
}

async function testEliminarPedidoError(cli){    
    let rta = await cli.eliminarPedido(56)
    console.log("\nEliminar Pedido Error:")    
    console.log(rta)
}

async function main(){  

    const tests = [
        testObtenerTodos,
        testObtenerPorIdUsuario,
        testObtenerPorIdUsuarioError,
        testobtenerPedidoPorId,
        testobtenerPedidoPorIdError,
        testobtenerDetallesPorIdPedido,
        testobtenerDetallesPorIdPedidoError,
        testAgregarPedido,
        testAgregarPedidoError,
        testModificarPedido,
        testModificarPedidoError,
        testEliminarPedido,
        testEliminarPedidoError
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