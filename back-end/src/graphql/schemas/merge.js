import authSchema from "./auth.schema";
import bookingSchema from "./booking.schema";
import eventSchema from "./event.schema";

const mergeSchema = `
    ${bookingSchema}

    ${eventSchema}

    ${authSchema}


    type RootQuery{
        events : [Event!]!
        users: [User!]!
        bookings: [Booking!]!
        login(email:String!,password:String!):AuthData!
    }   

    type RootMutation {
        createEvent(eventInput : EventInput):Event
        createUser(userInput : UserInput):User
        bookEvent(eventId: ID!): Booking
        cancel(eventId: ID!): Booking
    }
`

export default mergeSchema;