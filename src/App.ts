import express,{ Application} from 'express';
import cors from 'cors';
import morgan from 'morgan'
import { config } from 'dotenv'
import fs from "fs";
import https from "https";
import { PrismaClient } from '@prisma/client';

import ArticulosRoutes from './api/routes/articulos.routes'

config();

const {DATABASE_URL} = process.env;

console.log(DATABASE_URL)
export default class App{
    app:Application;
    credentials:any
    prisma:any
    httpsServer:any

    constructor(){
        this.app = express();
        this.httpsServer = https.createServer(this.credentials, this.app);
        this.prisma = new PrismaClient();
        this.config();
        this.middlewares();
        this.routes();
    }

    config = () => {
        this.app.set('port', process.env.PORT || 5000)
    }

    middlewares = () => {
        this.app.use(morgan('dev'));
        this.app.use(cors());
    }

    routes = () => {
        this.app.get('/', async (req,res) => {
            res.json("Api ok")
        })
        this.app.use('/articulos', ArticulosRoutes)
    }

    listen = () => {
        this.app.listen(this.app.get('port'), () => {
            console.log(`server on port ${this.app.get('port')}`)
        })
    }

}