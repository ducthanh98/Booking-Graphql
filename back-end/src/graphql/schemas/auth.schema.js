
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

    type AuthData {
        userId:String!
        token:String!
        tokenExpiration:Int!
    }
`;

export default authSchema;