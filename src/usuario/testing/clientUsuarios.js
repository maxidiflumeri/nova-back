import request from 'request-promise-native'

function crearCliente(path, port){
    const serverPath = path + ':' + port

    const apiPath = '/api/usuarios'

    async function obtenerTodos(){
        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true
        }

        return await request(options)
    }

    
    async function obtenerUsuarioPorId(idUsuario){
        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true,
            qs: {idUsuario: idUsuario }
        }

        return await request(options)
    }

    async function agregarUsuario(usuario){
        const options = {
            method: 'post',
            uri: serverPath + apiPath,
            body: usuario,
            json: true
        }

        return await request(options)
    }

    async function modificarUsuario(idUsuario,usuario){
        const options = {
            method: 'put',
            uri: serverPath + apiPath + '/' + idUsuario,
            body: usuario,
            json: true
        }

        return await request(options)
    }

    async function eliminarUsuario(idUsuario){
        const options = {
            method: 'delete',
            uri: serverPath + apiPath + '/' + idUsuario,
            json: true
        }

        return await request(options)
    }



    return {
        obtenerTodos,
        obtenerUsuarioPorId,
        agregarUsuario,
        modificarUsuario,
        eliminarUsuario
    }

}

export default crearCliente