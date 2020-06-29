import request from 'request-promise-native'

function crearCliente(path, port){
    const serverPath = path + ':' + port

    const apiPath = '/api/telefonos'

    async function obtenerTodos(){
        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true
        }

        return await request(options)
    }

    
    async function obtenerTelefonosPorIdUsuario(idUsuario){
        const options = {
            method: 'get',
            uri: serverPath + apiPath,
            json: true,
            qs: {idUsuario: idUsuario }
        }

        return await request(options)
    }

    async function agregarTelefono(telefono){
        const options = {
            method: 'post',
            uri: serverPath + apiPath,
            body: telefono,
            json: true
        }

        return await request(options)
    }

    async function modificarTelefono(idUsuario, telefono, telefonoViejo){
        const options = {
            method: 'put',
            uri: serverPath + apiPath + '/' + idUsuario + '/' + telefonoViejo,
            body: telefono,
            json: true
        }

        return await request(options)
    }

    async function eliminarTelefono(idUsuario, telefono){
        const options = {
            method: 'delete',
            uri: serverPath + apiPath + '/' + idUsuario + '/' + telefono,
            json: true
        }

        return await request(options)
    }



    return {
        obtenerTodos,
        obtenerTelefonosPorIdUsuario,
        agregarTelefono,
        modificarTelefono,
        eliminarTelefono
    }

}

export default crearCliente