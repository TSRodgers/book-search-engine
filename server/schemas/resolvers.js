const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
  users: async () => {
    return User.find()
      .select('-__v -password')
      .populate('books')
  },
  user: async (parent, { username }) => {
    return User.findOne({ username })
      .select('-__v -password')
      .populate('books');
   },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      return user;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect Credentials');
      }

      return user;
    },
    saveBook: async (parent, { input }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: _id},
        { $addtoset: { savedBooks: input } },
        { new: true }
      );
      return updatedUser;
    },
    removeBook: async (parent, args) => {
      constUser = await User.findOneAndUpdate(
        { _id: _id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
      return updatedUser;
    }
  }
};

module.exports = resolvers;