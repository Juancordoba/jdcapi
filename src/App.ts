import express,{ Application} from 'express';
import cors from 'cors';
import morgan from 'morgan'
import fs from "fs";
import https from "https";
import { config } from 'dotenv'

var privateKey  = fs.readFileSync('./src/cert/server.key', 'utf8');
var certificate = fs.readFileSync('./src/cert/server.crt', 'utf8');

config();

export default class App{
    app:Application;
    httpsServer:any
    credentials:any

    constructor(){
        this.app = express();
        this.config();
        this.httpsServer = https.createServer(this.credentials, this.app);
        this.middlewares();
        this.routes();
    }

    config = () => {
        this.app.set('port', process.env.PORT || 5000)
        this.app.set('https_port', process.env.HTTPS || 5443);
        this.credentials = {key: privateKey, cert: certificate};
    }

    middlewares = () => {
        this.app.use(morgan('dev'));
        this.app.use(cors());
    }


    routes = () => {
        this.app.get('/', (req,res) => {
            res.json('Api ok')
        })
    }


    listen = () => {

        this.httpsServer.listen(this.app.get('https_port'),() => {
            console.log(`https server on port ${this.app.get('https_port')}`)
        });

        this.app.listen(this.app.get('port'), () => {
            console.log(`server on port ${this.app.get('port')}`)
        })
    }


}