import express,{ Application} from 'express';
import cors from 'cors';
import morgan from 'morgan'
import { config } from 'dotenv'

config();

export default class App{
    app:Application;

    constructor(){
        this.app = express();
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
        this.app.get('/', (req,res) => {
            res.json('Api ok')
        })
    }


    listen = () => {
        this.app.listen(this.app.get('port'), () => {
            console.log(`server on port ${this.app.get('port')}`)
        })
    }


}