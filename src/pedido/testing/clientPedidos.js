// DEV BY MAXIMILIANO ARIEL DI FLUMERI

import request from 'request-promise-native'

function crearCliente(path, port){
    const serverPath = 'http://' + path + ':' + port

    const apiPath = '/api/pedidos'
    const apiPathLogin = '/api/login'

    async function login(objeto){
        const options = {
            method: 'post',
            uri: serverPath + apiPathLogin,
            body: objeto,
            json: true,             
        }
        return await request(options)
    }

    async function obtenerTodos(token){

        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            headers: {
                Authorization: `Bearer ${token}`
            },
            json: true
        }

        return await request(options)
    }

    
    async function obtenerPorIdUsuario(id, token){

        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            headers: {
                Authorization: `Bearer ${token}`
            },
            json: true,
            qs: {idUsuario: id }
        }

        return await request(options)
    }

        
    async function obtenerDetallesPorIdPedido(id, token){

        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            headers: {
                Authorization: `Bearer ${token}`
            },
            json: true,
            qs: {idDetalle: id }
        }

        return await request(options)
    }

    async function obtenerPedidoPorId(id, token){

        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            headers: {
                Authorization: `Bearer ${token}`
            },
            json: true,
            qs: {idPedido: id }
        }

        return await request(options)
    }

    
    async function obtenerPedidoPorIdError(id, token){

        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            headers: {
                Authorization: `Bearer ${token}`
            },
            json: true,
            qs: {id_Pedido: id }
        }

        return await request(options)
    }

    async function agregarPedido(pedido, token){

        const options = {
            method: 'post',
            uri: serverPath + apiPath,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: pedido,
            json: true
        }

        return await request(options)
    }

    async function modificarPedido(pedido,id, token){

        const options = {
            method: 'put',
            uri: serverPath + apiPath + '/' + id,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: pedido,
            json: true
        }

        return await request(options)
    }

    async function eliminarPedido(id, token){

        const options = {
            method: 'delete',
            uri: serverPath + apiPath + '/' + id,
            headers: {
                Authorization: `Bearer ${token}`
            },
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
        obtenerPedidoPorIdError,
        login
    }

}

export default crearCliente