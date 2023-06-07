const resolvers = {
  Query: {
    hello: () => "Hello, World!",
  },
 /* Mutation: {
    createUser: (_, { name, email }) => {
      const user = {
        id: String(users.length + 1),
        name,
        email,
      };
      users.push(user);
      return user;
    },
  },*/
};

export default  resolvers;
