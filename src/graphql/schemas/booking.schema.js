
const bookingSchema = `
    type Booking {
        _id:ID!
        event:Event!
        user:User!
        created:String!
        updated:String!
    }

`;

export default bookingSchema;
