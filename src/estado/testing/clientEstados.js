//DEV BY EZE LABORANTI
import request from 'request-promise-native'

function crearCliente(path, port) {
    const serverPath = 'http://' + path + ':' + port

    const apiPath = '/api/estados'
    const apiPathLogin = '/api/login'

    async function login(objeto) {
        const options = {
            method: 'post',
            uri: serverPath + apiPathLogin,
            body: objeto,
            json: true,
        }
        return await request(options)
    }

    async function obtenerTodos(token) {
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

    async function obtenerPorId(id, token) {
        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            headers: {
                Authorization: `Bearer ${token}`
            },
            json: true,
            qs: { id: id }
        }
        return await request(options)
    }

    async function obtenerPorIdFallido(id, token) {
        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            headers: {
                Authorization: `Bearer ${token}`
            },
            json: true,
            qs: { id_: id }
        }
        return await request(options)
    }

    async function obtenerPorDescripcion(desc, token) {
        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            headers: {
                Authorization: `Bearer ${token}`
            },
            json: true,
            qs: { descripcion: desc }
        }
        return await request(options)
    }

    async function obtenerPorDescripcionFallido(desc, token) {
        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            headers: {
                Authorization: `Bearer ${token}`
            },
            json: true,
            qs: { descripcion_: desc }
        }
        return await request(options)
    }

    async function agregar(objeto, token) {
        const options = {
            method: 'post',
            uri: serverPath + apiPath,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: objeto,
            json: true
        }
        return await request(options)
    }

    async function modificar(id, objeto, token) {
        const options = {
            method: 'put',
            uri: serverPath + apiPath + '/' + id,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: objeto,
            json: true
        }
        return await request(options)
    }

    async function eliminar(id, token) {
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
        obtenerPorId,
        obtenerPorIdFallido,
        obtenerPorDescripcion,
        obtenerPorDescripcionFallido,
        agregar,
        eliminar,
        modificar
    }
}

export default crearCliente