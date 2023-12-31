const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes");
const { typeDefs, resolvers } = require("./schema"); // Import your schema and resolvers

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// Create an Apollo Server instance and apply it to the Express app
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Apply the Apollo Server as middleware to your Express app
server.applyMiddleware({ app });

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
