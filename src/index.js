// @flow
import express, { Application } from 'express';
import { buildSchema } from 'graphql';
import graphqlHttp from 'express-graphql';
import mongoose from 'mongoose';
import eventSchema from './models/event.model';

class Server {
    constructor() {
        this.app = express();
        this.events = [];
        this.port = process.env.port || 3000;
        this.routes();
        this.config();
        this.useGraphql();
    }

    config: void = () => {
        this.app.use(express.json());
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
                schema: buildSchema(`
                type Event {
                    _id:ID!
                    title:String!
                    description:String!
                    price:Float!
                    date:String!
                }

                input EventInput{
                    title:String!
                    description:String!
                    price:Float!
                    date: String!
                }

                type RootQuery{
                    events : [Event!]!
                }   
                
                type RootMutation {
                    createEvent(eventInput:EventInput):Event
                }
            
                schema {
                        query: RootQuery
                        mutation: RootMutation
                    }
            `),
                rootValue: {
                    events: () => {
                        return eventSchema.find()
                            .then((result) => {
                                return result.map((event) => {
                                    return { ...event._doc, _id: event._doc._id.toString() }
                                })
                            })
                    },
                    createEvent: (args) => {
                        const event = new eventSchema({
                            title: args.eventInput.title,
                            description: args.eventInput.description,
                            price: args.eventInput.price,
                            date: new Date(args.eventInput.date)
                        })
                        event.save()
                            .then((result) => {
                                return { ...result._doc, _id: result._doc._id.toString() }
                            }).catch((err) => {
                                throw err;
                            })
                        return event;
                    }
                },
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
