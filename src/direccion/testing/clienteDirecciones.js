import request from 'request-promise-native'

function crearCliente(path, port){
    const serverPath = path + ':' + port

    const apiPath = '/api/direcciones'

    async function obtenerTodos(){
        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true
        }

        return await request(options)
    }

    
    async function obtenerDireccionesPorUsuario(idUsuario){
        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true,
            qs: {idUsuario: idUsuario }
        }

        return await request(options)
    }

    async function agregarDireccion(direccion){
        const options = {
            method: 'post',
            uri: serverPath + apiPath,
            body: direccion,
            json: true
        }

        return await request(options)
    }

    async function modificarDireccion(idUsuario, idDireccion, direccion){
        const options = {
            method: 'put',
            uri: serverPath + apiPath + '/' + idUsuario + '/' + idDireccion,
            body: direccion,
            json: true
        }

        return await request(options)
    }

    async function eliminarDireccion(idUsuario, direccion){
        const options = {
            method: 'delete',
            uri: serverPath + apiPath + '/' + idUsuario + '/' + direccion,
            json: true
        }

        return await request(options)
    }



    return {
        obtenerTodos,
        obtenerDireccionesPorUsuario,
        agregarDireccion,
        modificarDireccion,
        eliminarDireccion
    }

}

export default crearCliente