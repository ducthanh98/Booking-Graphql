// @flow
import express, { Application } from 'express';
import graphqlHttp from 'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';

import graphqlSchema from './graphql/schemas/index';
import graphqlResolvers from './graphql/resolvers/index';
import checkAuth from './middlewares/authentication';
class Server {
    constructor() {
        this.app = express();
        this.events = [];
        this.port = process.env.port || 4200;
        this.routes();
        this.config();
        this.useGraphql();
    }

    config: void = () => {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(checkAuth);
        mongoose.connect(`mongodb+srv://admin:JNfcK2lBBh0b9xwm@cluster0-7u2rc.mongodb.net/graphql?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) console.log(err);
        })
        this.app.listen(this.port, () => {
            console.log('App is working now');
        });
    }

    useGraphql = () => {
        this.app.use('/graphql',
            graphqlHttp({
                schema: graphqlSchema,
                rootValue: graphqlResolvers,
                graphiql: true
            }))
    }

    routes: void = () => {
        this.app.get('/', (req, res) => {
            res.send('App is working now');
        });
    }
}
export default new Server().app;
