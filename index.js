import crearServidor from './src/config/server.js'

const puerto = 8080
const app = crearServidor()
const server = app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})