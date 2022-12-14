const path = require('path');
const express = require('express');
// import apollor server
const { ApolloServer } = require('apollo-server-express');

// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// import auth
const { authMiddleWare } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
// create a new Apollo Server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleWare
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create new instance of an Apollo server with the GraphQL schema 
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate out Apollo server with express application as middleware
  server.applyMiddleware({ app });

  // serve up static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`)
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer(typeDefs, resolvers);