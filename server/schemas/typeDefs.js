// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our TypeDefs
const typeDefs = gql`
  type Query {
    helloWorld: String
  }
`;

// export typeDefs
module.export = typeDefs;