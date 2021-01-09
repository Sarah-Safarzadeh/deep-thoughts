const { User, Thought } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  // Query property
  Query: {
    me: async (parent, args) => {
      const userData = await User.findOne({})
      .select('-__v -password')
      .populate('thoughts')
      .populate('friends');

      return userData;
    },
    // Get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("thoughts")
        .populate("friends");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
  },

  // Mutation property
  Mutation: {
    // Add a user
    addUser: async () => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    // User login
    login: async (parent, { email, passowrd }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
