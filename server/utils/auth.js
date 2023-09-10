const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express"); // Import Apollo Server's AuthenticationError

// Set token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.headers.authorization || "";

    if (token) {
      // Check if the token starts with 'Bearer ' and remove it if present
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
      }

      if (!token) {
        throw new AuthenticationError("You have no token!");
      }

      try {
        // Verify token and decode user data
        const { data } = jwt.verify(token, secret, { expiresIn: expiration });
        return { user: data };
      } catch (error) {
        throw new AuthenticationError("Invalid token");
      }
    } else {
      throw new AuthenticationError("Authentication token must be provided");
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
