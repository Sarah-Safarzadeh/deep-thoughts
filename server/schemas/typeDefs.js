// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our TypeDefs
const typeDefs = gql`
type Thought {
  _id: ID
  thoughtText: String
  createdAt: String
  username: String
  reactionCount: Int
}
  type Query {
    thoughts: [Thought]
  }
`;

// export typeDefs
module.export = typeDefs;