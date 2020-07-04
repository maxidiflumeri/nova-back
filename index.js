import crearServidor from './src/config/server.js'
import config from './src/config/config.js'


const app = crearServidor()
const server = app.listen(config.PORT, config.HOST, () => {
    console.log(`Servidor escuchando en http://${config.HOST}/${config.PORT}`)
})