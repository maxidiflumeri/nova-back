//TOMAS MELENDEZ
import request from 'request-promise-native'

function crearCliente(path, port){
    const serverPath = 'http://'+ path + ':' + port

    const apiPath = '/api/direcciones'
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

    
    async function obtenerDireccionesPorUsuario(idUsuario, token){
        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            headers: {
                Authorization: `Bearer ${token}`
            },
            json: true,
            qs: {idUsuario: idUsuario }
        }

        return await request(options)
    }

    async function agregarDireccion(direccion, token){
        const options = {
            method: 'post',
            uri: serverPath + apiPath,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: direccion,
            json: true
        }

        return await request(options)
    }

    async function modificarDireccion(idUsuario, idDireccion, direccion, token){
        const options = {
            method: 'put',
            uri: serverPath + apiPath + '/' + idUsuario + '/' + idDireccion,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: direccion,
            json: true
        }

        return await request(options)
    }

    async function eliminarDireccion(idUsuario, direccion, token){
        const options = {
            method: 'delete',
            uri: serverPath + apiPath + '/' + idUsuario + '/' + direccion,
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
        obtenerDireccionesPorUsuario,
        agregarDireccion,
        modificarDireccion,
        eliminarDireccion
    }

}

export default crearCliente