// DEV BY MAXIMILIANO ARIEL DI FLUMERI

import request from 'request-promise-native'

function crearCliente(path, port){
    const serverPath = path + ':' + port

    const apiPath = '/api/pedidos'

    async function obtenerTodos(){

        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true
        }

        return await request(options)
    }

    
    async function obtenerPorIdUsuario(id){

        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true,
            qs: {idUsuario: id }
        }

        return await request(options)
    }

        
    async function obtenerDetallesPorIdPedido(id){

        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true,
            qs: {idDetalle: id }
        }

        return await request(options)
    }

    async function obtenerPedidoPorId(id){

        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true,
            qs: {idPedido: id }
        }

        return await request(options)
    }

    
    async function obtenerPedidoPorIdError(id){

        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true,
            qs: {id_Pedido: id }
        }

        return await request(options)
    }

    async function agregarPedido(pedido){

        const options = {
            method: 'post',
            uri: serverPath + apiPath,
            body: pedido,
            json: true
        }

        return await request(options)
    }

    async function modificarPedido(pedido,id){

        const options = {
            method: 'put',
            uri: serverPath + apiPath + '/' + id,
            body: pedido,
            json: true
        }

        return await request(options)
    }

    async function eliminarPedido(id){

        const options = {
            method: 'delete',
            uri: serverPath + apiPath + '/' + id,
            json: true
        }

        return await request(options)
    }



    return {
        obtenerTodos,
        obtenerPorIdUsuario,
        obtenerDetallesPorIdPedido,
        obtenerPedidoPorId,
        agregarPedido,
        modificarPedido,
        eliminarPedido,
        obtenerPedidoPorIdError
    }

}

export default crearCliente