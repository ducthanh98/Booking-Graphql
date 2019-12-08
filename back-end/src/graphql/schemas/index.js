import { buildSchema } from 'graphql';
import mergeSchema from './merge';
export default buildSchema(`

    ${mergeSchema}

    schema {
            query: RootQuery
            mutation: RootMutation
        }
`);

