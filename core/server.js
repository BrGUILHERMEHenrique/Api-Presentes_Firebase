import Fastify from "fastify";
import http from "http2";
import path from "path";
import DataExporter from '../service/dataExporter.js';

const INITIAL_ROUTE = '/presentes/';

const fastifyServer = Fastify({
    logger: true
});

try{
    fastifyServer.listen({port:3000});
} catch (e){
    fastifyServer.log.error(e);
    process.exit(1);
}

fastifyServer.get(INITIAL_ROUTE + 'all', (req, rep) => {
    let dataExp = new DataExporter();
    try {
        rep.status(200);
        rep.send(dataExp.RetriveAll());    
    } catch (error) {
        rep.status(400);
        rep.send('não foi possivel carregar nenhuma dado');
    }
});

fastifyServer.get(INITIAL_ROUTE + ':id', async (req, rep) => {
    const { id } = req.params;
    let dataExp = new DataExporter();
    try {
        console.log('id: ', id);
        let item = await dataExp.RetriveById(id);    
        if (item) {
            rep.status(200);
            rep.send(item);
        } else {
            rep.status(404);
            rep.send('Não foi encontrado item com esse id');
        }
    } catch (error) {
        rep.status(400);
        rep.send('não foi possivel carregar os dados, ', error);
    }
});

fastifyServer.get(INITIAL_ROUTE + '/search', (req, rep) => {
    let dataExp = new DataExporter();
    const body = req.body;
    return dataExp.search(body.nome);
});