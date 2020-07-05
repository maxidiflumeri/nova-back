//TOMAS MELENDEZ
import request from 'request-promise-native'

function crearCliente(path, port){
    const serverPath = 'http://'+ path + ':' + port

    const apiPath = '/api/usuarios'
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

    
    async function obtenerUsuarioPorId(idUsuario, token){
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

    async function agregarUsuario(usuario, token){
        const options = {
            method: 'post',
            uri: serverPath + apiPath,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: usuario,
            json: true
        }

        return await request(options)
    }

    async function modificarUsuario(idUsuario,usuario, token){
        const options = {
            method: 'put',
            uri: serverPath + apiPath + '/' + idUsuario,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: usuario,
            json: true
        }

        return await request(options)
    }

    async function eliminarUsuario(idUsuario, token){
        const options = {
            method: 'delete',
            uri: serverPath + apiPath + '/' + idUsuario,
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
        obtenerUsuarioPorId,
        agregarUsuario,
        modificarUsuario,
        eliminarUsuario
    }

}

export default crearCliente