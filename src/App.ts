import express,{ Application} from 'express';
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql"
import cors from 'cors';
import morgan from 'morgan'
import { config } from 'dotenv'
import fs from "fs";
import https from "https";
import { PrismaClient } from '@prisma/client';

import ArticulosRoutes from './api/routes/articulos.routes'

import resolvers from './resolvers';

config();

const {DATABASE_URL} = process.env;

console.log(resolvers.Query.hello)
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The root provides a resolver function for each API endpoint
// var root = {
//    hello: () => {
//      return "Hello world!"
//    },
//  }

export default class App{
    private apollo: Application;
    app:Application;
    prisma:any

    constructor(){
        this.app = express();
        this.apollo = express();
        this.prisma = new PrismaClient();
        this.config();
        this.middlewares();
        this.routes();
    }

    config = () => {
        this.app.set('port', process.env.PORT || 5000)
        this.apollo.set('port', process.env.APOLLO_PORT || 5001)
    }

    middlewares = () => {
        // express
        this.app.use(morgan('dev'));
        this.app.use(cors());
        // apollo
        this.apollo.use(
            "/graphql",
           // cors<cors.CorsRequest>({origin:['http://localhost:3000']}),
            graphqlHTTP({
              schema: schema,
              rootValue: resolvers.Query,
              graphiql: true,
            })
          )

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

        this.apollo.listen(this.apollo.get('port'))
        console.log(`Running a GraphQL API server at http://localhost:${this.apollo.get('port')}/graphql`)
         
    }

}