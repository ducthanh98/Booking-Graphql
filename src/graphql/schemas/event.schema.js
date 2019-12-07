const eventSchema = `
    type Event {
        _id:ID!
        title:String!
        description:String!
        price:Float!
        date:String!
        creator: User!
    }

    
    input EventInput {
        title:String!
        description:String!
        price:Float!
        date: String
    }
`;

export default eventSchema;