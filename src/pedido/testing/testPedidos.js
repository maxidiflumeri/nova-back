// DEV BY MAXIMILIANO ARIEL DI FLUMERI
import crearServidor from '../../config/server.js'
import crearCliente from '../testing/clientPedidos.js'
import config from '../../config/config.js'

let incremental = 78

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
    let rta = await cli.obtenerTodos(token)
    console.log("\n---------------------------")
    console.log("\nObtener todos los Pedidos: ")
    console.log("\n---------------------------")
    console.log(rta)
    console.log("\n---------------------------")
    console.log("\n---------------------------")
}

async function testObtenerPorIdUsuario(cli, token){
    let rta = await cli.obtenerPorIdUsuario(1, token)
    console.log("\n---------------------------")
    console.log("\nBusqueda por Id Usuario: ")
    console.log("\n---------------------------")
    console.log(rta)
    console.log("\n---------------------------")
    console.log("\n---------------------------")
}

async function testObtenerPorIdUsuarioError(cli, token){
    let rta = await cli.obtenerPorIdUsuario(85, token)
    console.log("\n---------------------------")
    console.log("\nBusqueda por Id Usuario: ")
    console.log("\n---------------------------")
    console.log(rta)
    console.log("\n---------------------------")
    console.log("\n---------------------------")
}

async function testobtenerDetallesPorIdPedido(cli, token){
    let rta = await cli.obtenerDetallesPorIdPedido(54, token)
    console.log("\n---------------------------")
    console.log("\nBusqueda de items por Id de Pedido: ")
    console.log("\n---------------------------")
    console.log(rta)
    console.log("\n---------------------------")
    console.log("\n---------------------------")
}

async function testobtenerDetallesPorIdPedidoError(cli, token){
    let rta = await cli.obtenerDetallesPorIdPedido(85, token)
    console.log("\n---------------------------")
    console.log("\nBusqueda de items por Id de Pedido Erroneo: ")
    console.log("\n---------------------------")
    console.log(rta)
    console.log("\n---------------------------")
    console.log("\n---------------------------")
}

async function testobtenerPedidoPorId(cli, token){
    let rta = await cli.obtenerPedidoPorId(54, token)
    console.log("\n---------------------------")
    console.log("\nBusqueda de pedido por Id: ")
    console.log("\n---------------------------")
    console.log(rta)
    console.log("\n---------------------------")
    console.log("\n---------------------------")
}

async function testobtenerPedidoPorIdError(cli, token){
    let rta = await cli.obtenerPedidoPorIdError(85, token)
    console.log("\n---------------------------")
    console.log("\nBusqueda de pedido por Id Error: ")
    console.log("\n---------------------------")
    console.log(rta)
    console.log("\n---------------------------")
    console.log("\n---------------------------")
}

async function testAgregarPedido(cli, token){
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
    let rta = await cli.agregarPedido(pedido, token)
    console.log("\n---------------------------")
    console.log("\nPedido Agregado: ")
    console.log("\n---------------------------")
    console.log(rta)
    console.log("\n---------------------------")
    console.log("\n---------------------------")
}

async function testAgregarPedidoError(cli, token){
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
    let rta = await cli.agregarPedido(pedido, token)
    console.log("\n---------------------------")
    console.log("\nPedido Agregado Error: ")
    console.log("\n---------------------------")
    console.log(rta)
    console.log("\n---------------------------")
    console.log("\n---------------------------")
}

async function testModificarPedido(cli, token){
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
    let rta = await cli.modificarPedido(pedido,incremental, token)
    console.log("\n---------------------------")
    console.log("\nModificar Pedido: ")
    console.log("\n---------------------------")
    console.log(rta)
    console.log("\n---------------------------")
    console.log("\n---------------------------")
}

async function testModificarPedidoError(cli, token){
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
    let rta = await cli.modificarPedido(pedido,56,token)
    console.log("\n---------------------------")
    console.log("\nModificar Pedido Error: ")
    console.log("\n---------------------------")
    console.log(rta)
    console.log("\n---------------------------")
    console.log("\n---------------------------")
}

async function testEliminarPedido(cli, token){    
    let rta = await cli.eliminarPedido(incremental,token)
    console.log("\n---------------------------")
    console.log("\nEliminar Pedido:")    
    console.log("\n---------------------------")
    console.log(rta)
    console.log("\n---------------------------")
    console.log("\n---------------------------")
}

async function testEliminarPedidoError(cli, token){    
    let rta = await cli.eliminarPedido(56,token)
    console.log("\n---------------------------")
    console.log("\nEliminar Pedido Error:")    
    console.log("\n---------------------------")
    console.log(rta)
    console.log("\n---------------------------")
    console.log("\n---------------------------")
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