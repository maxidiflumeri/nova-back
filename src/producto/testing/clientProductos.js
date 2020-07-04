import request from 'request-promise-native'

function crearCliente(path, port) {
    const serverPath = 'http://'+ path + ':' + port

    const apiPath = '/api/productos'
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

    async function agregarProducto(producto, token) {

        const options = {
            method: 'post',
            uri: serverPath + apiPath,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: producto,
            json: true
        }

        return await request(options)
    }

    async function modificarProducto(id, producto, token) {

        const options = {
            method: 'put',
            uri: serverPath + apiPath + '/' + id,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: producto,
            json: true
        }

        return await request(options)
    }

    async function eliminarProducto(id, token) {

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
        login,
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