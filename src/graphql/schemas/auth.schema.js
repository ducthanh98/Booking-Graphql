
const authSchema = `
    type User {
        _id:ID!
        email:String!
        password:String
        createdEvent : [Event!]
    }


    input UserInput {
        email:String!
        password:String!
    }
`;

export default authSchema;