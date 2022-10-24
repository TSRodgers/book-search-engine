// import the gql tagges template function 
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`
  type Query {
    helloWorld: String
  }
`;

// export typeDefs
module.exports = typeDefs;