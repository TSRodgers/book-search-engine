const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { type } = require('os');

// import ApolloServer and typeDefs and resolvers
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;

// create a new apollor server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// integrate our apollo server with the express application as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// create new instance of an Apollor server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // log where we can go to test our GQL API
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// call the async function to start the server
startApolloServer(typeDefs. resolvers);


