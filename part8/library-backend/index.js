const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require("apollo-server");
const { v1: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const JWT_SECRET = "Sonala_Public_Network";

const MONGODB_URI =
  "mongodb+srv://fullstack:Dkt6iXq9izNOnyiz@cluster0.wvhpz.mongodb.net/fullstackdb?retryWrites=true&w=majority";

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error conneciton to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addAuthor(name: String!, born: Int): Author
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      password: String!
      name: String
      favoriteGenre: String!
    ): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      if (author && genre) {
        const existedAuthor = await Author.findOne({ name: author });
        if (existedAuthor) {
          return await Book.find({
            author: existedAuthor._id,
            genres: genre,
          }).populate("author");
        } else {
          return null;
        }
      }
      if (author) {
        const existedAuthor = await Author.findOne({ name: author });
        if (existedAuthor) {
          return await Book.find({ author: existedAuthor._id }).populate(
            "author"
          );
        } else {
          return null;
        }
      }
      if (genre) {
        return await Book.find({ genres: genre }).populate("author");
      }
      return await Book.find({}).populate("author");
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({});
      const authorByBookCount = authors.map((author) => {
        const booksByAuthor = books.filter((book) => {
          return book.author.equals(author._id);
        });
        return {
          name: author.name,
          born: author.born,
          bookCount: booksByAuthor.length,
        };
      });
      return authorByBookCount;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated, please login first");
      }
      try {
        let existedAuthor = await Author.findOne({ name: args.author });
        if (!existedAuthor) {
          existedAuthor = new Author({ name: args.author });
          await existedAuthor.save();
        }
        const book = new Book({ ...args });
        book.author = existedAuthor;
        await book.save();
        return book;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated, please login first");
      }
      try {
        const author = await Author.findOne({ name: args.name });
        if (!author) {
          return null;
        }
        author.born = args.setBornTo;
        await author.save();
        const booksByAuthor = await Book.find({ author: author._id });
        author.bookCount = booksByAuthor.length;
        return author;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    createUser: async (root, { username, password, name, favoriteGenre }) => {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const userInDB = new User({
        username,
        passwordHash,
        name,
        favoriteGenre,
      });
      try {
        await userInDB.save();
        return {
          id: userInDB._id,
          username: userInDB.username,
          favoriteGenre: userInDB.favoriteGenre,
        };
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args) => {
      const userInDB = await User.findOne({ username: args.username });
      let compareResult = false;
      try {
        compareResult = await bcrypt.compare(args.password, userInDB.passwordHash);
      } catch (error) {
        console.log(error);
      }
      const passwordCorrect = !userInDB ? false : compareResult;
      if (!(userInDB && passwordCorrect)) {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = {
        username: userInDB.username,
        id: userInDB._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
