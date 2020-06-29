import request from 'request-promise-native'

function crearCliente(path, port) {
    const serverPath = path + ':' + port

    const apiPath = '/api/productos'

    async function obtenerTodos() {

        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true
        }

        return await request(options)
    }

    async function obtenerProductoPorId(id) {

        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true,
            qs: { id_producto: id }
        }

        return await request(options)
    }


    async function obtenerProductoPorModelo(model) {

        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true,
            qs: { modelo: model }
        }

        return await request(options)
    }

    async function obtenerProductoPorIdTipo(id) {

        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true,
            qs: { id_tipo: id }
        }

        return await request(options)
    }

    async function obtenerProductoPorIdMarca(id) {

        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true,
            qs: { id_marca: id }
        }

        return await request(options)
    }

    async function agregarProducto(producto) {

        const options = {
            method: 'post',
            uri: serverPath + apiPath,
            body: producto,
            json: true
        }

        return await request(options)
    }

    async function modificarProducto(id, producto) {

        const options = {
            method: 'put',
            uri: serverPath + apiPath + '/' + id,
            body: producto,
            json: true
        }

        return await request(options)
    }

    async function eliminarProducto(id) {

        const options = {
            method: 'delete',
            uri: serverPath + apiPath + '/' + id,
            json: true
        }

        return await request(options)
    }

    return {
        obtenerTodos,
        obtenerProductoPorId,
        obtenerProductoPorModelo,
        obtenerProductoPorIdTipo,
        obtenerProductoPorIdMarca,
        agregarProducto,
        modificarProducto,
        eliminarProducto
    }

}

export default crearCliente