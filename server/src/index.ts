import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    input BookInput {
        title: String
    }
    
    type Book {
        id: ID!
        title: String
    }
    
    type Query {
        allBooks: [Book]!
        getBook(id: ID!): Book
    }

`);

// The root provides a resolver function for each API endpoint
const root = {
    hello: () => {
        return "Hello world!";
    },
};

const app = express();
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
