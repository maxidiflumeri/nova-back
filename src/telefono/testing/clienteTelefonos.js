//TOMAS MELENDEZ
import request from 'request-promise-native'

function crearCliente(path, port){
    const serverPath = 'http://'+ path + ':' + port

    const apiPath = '/api/telefonos'
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

    
    async function obtenerTelefonosPorIdUsuario(idUsuario, token){
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

    async function agregarTelefono(telefono, token){
        const options = {
            method: 'post',
            uri: serverPath + apiPath,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: telefono,
            json: true
        }

        return await request(options)
    }

    async function modificarTelefono(idUsuario, telefono, telefonoViejo, token){
        const options = {
            method: 'put',
            uri: serverPath + apiPath + '/' + idUsuario + '/' + telefonoViejo,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: telefono,
            json: true
        }

        return await request(options)
    }

    async function eliminarTelefono(idUsuario, telefono, token){
        const options = {
            method: 'delete',
            uri: serverPath + apiPath + '/' + idUsuario + '/' + telefono,
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
        obtenerTelefonosPorIdUsuario,
        agregarTelefono,
        modificarTelefono,
        eliminarTelefono
    }

}

export default crearCliente