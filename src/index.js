// @flow
import express, { Application } from 'express';

class Server {
    constructor () {
        this.app = express();
        this.port = process.env.port || 3000;
        this.routes();
        this.config();
    }

    config: void = () => {
        this.app.use(express.json());

        this.app.listen(this.port, () => {
            console.log('App is working now');
        });
    }

    routes: void = () => {
        this.app.get('/', (req, res) => {
            res.send('App is working now');
        });
    }
}
export default new Server().app;
