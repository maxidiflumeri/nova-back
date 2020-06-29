//DEV BY EZE LABORANTI
import request from 'request-promise-native'

function crearCliente(path, port) {
    const serverPath = path + ':' + port

    const apiPath = '/api/tiposproducto'

    async function obtenerTodos() {
        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true
        }
        return await request(options)
    }

    async function obtenerPorId(id) {
        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true,
            qs: { id: id }
        }
        return await request(options)
    }

    async function obtenerPorIdFallido(id) {
        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true,
            qs: { id_ : id }
        }
        return await request(options)
    }

    async function obtenerPorDescripcion(desc) {
        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true,
            qs: { descripcion : desc }
        }
        return await request(options)
    }

    async function obtenerPorDescripcionFallido(desc) {
        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true,
            qs: { descripcion_ : desc }
        }
        return await request(options)
    }

    async function agregar(objeto) {
        const options = {
            method: 'post',
            uri: serverPath + apiPath,
            body: objeto,
            json: true
        }
        return await request(options)
    }

    async function modificar(id, objeto) {
        const options = {
            method: 'put',
            uri: serverPath + apiPath + '/' + id,
            body: objeto,
            json: true
        }
        return await request(options)
    }

    async function eliminar(id) {
        const options = {
            method: 'delete',
            uri: serverPath + apiPath + '/' + id,
            json: true
        }
        return await request(options)
    }

    return {
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