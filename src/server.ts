import  express  from 'express';
import rota from './routes/route17';//importando a rota pra usar

import bodyParser from 'body-parser';//importando o body parser pra funcionar o post com json

//usando o express
const app = express();

//configurando o body parser pra funcionar o post com json dentro do express e no postman tambem com body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//liberando o uso da rota com express
app.use(rota);

//colocando a resposta em json
app.use(express.json);

// MIDDLEWARE ESSENCIAL - SEM ISSO NÃO FUNCIONA!


//rodando o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando');
});

