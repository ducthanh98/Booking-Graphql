import { buildSchema } from 'graphql';

export default buildSchema(`
type Booking {
    _id:ID!
    event:Event!
    user:User!
    created:String!
    updated:String!
}

type Event {
    _id:ID!
    title:String!
    description:String!
    price:Float!
    date:String!
    creator: User!
}

type User {
    _id:ID!
    email:String!
    password:String
    createdEvent : [Event!]
}

input EventInput {
    title:String!
    description:String!
    price:Float!
    date: String
}

input UserInput {
    email:String!
    password:String!
}

type RootQuery{
    events : [Event!]!
    users: [User!]!
    bookings: [Booking!]!
}   

type RootMutation {
    createEvent(eventInput : EventInput):Event
    createUser(userInput : UserInput):User
    bookEvent(eventId: ID!): Booking
    cancel(eventId: ID!): Booking
}

schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
