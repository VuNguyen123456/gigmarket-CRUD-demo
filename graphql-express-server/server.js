// const express = require('express');
// const{graphqlHTTP} = require("express-graphql");
// const bcrypt = require('bcrypt');
// const { Client } = require('pg');
// const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList, GraphQLInputObjectType, GraphQLEnumType } = require('graphql');

// const app = express();
// const cors = require("cors");
// app.use(cors());


// const client = new Client({
//   host: "localhost",
//   user: "postgres",
//   port: 5432,
//   password: "Bill250605",
//   database: "postgres"
// })
// client.connect();

// const result = client.query("select * from users")

// // Define the Role enum
// const Role= new GraphQLEnumType({
//     name: 'Role',
//     values: {
//       WORKER: { value: 'WORKER' },
//       HIRER: { value: 'HIRER' }
//     }
//   });

// // Define your schema
// const UserType = new GraphQLObjectType({
//     name: 'User',
//     fields: {
//       id: { type: GraphQLID },
//       first: { type: GraphQLString },
//       last: { type: GraphQLString },
//       email: { type: GraphQLString },
//       phone: { type: GraphQLString },
//       password: { type: GraphQLString },
//       role: { type: Role},
//     }
//   });
  
//   const SignUpInputType = new GraphQLInputObjectType({
//     name: 'SignUpInput',
//     fields: {
//       first: { type: GraphQLNonNull(GraphQLString) },
//       last: { type: GraphQLNonNull(GraphQLString) },
//       email: { type: GraphQLNonNull(GraphQLString) },
//       phone: { type: GraphQLString },
//       password: { type: GraphQLNonNull(GraphQLString) },
//       role: { type: GraphQLNonNull(Role) },
//     }
//   });
  
//   const UpdateUserInputType = new GraphQLInputObjectType({
//     name: 'UpdateUserInput',
//     fields: {
//       first: { type: GraphQLString },
//       last: { type: GraphQLString },
//       email: { type: GraphQLString },
//       phone: { type: GraphQLString },
//       password: { type: GraphQLString },
//     }
//   });
  
//   const QueryType = new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//       getUser: {
//         type: UserType,
//         args: { id: { type: GraphQLNonNull(GraphQLID) } },
//         resolve: async (_, { id }) => {
//           try {
//             const query = 'SELECT * FROM users WHERE id = $1';
//             const { rows } = await client.query(query, [id]);
//             return rows[0];
//           } catch (error) {
//             throw new Error('Failed to fetch user');
//           }
//         }
//       },
//       listUsers: {
//         type: GraphQLList(UserType),
//         resolve: async () => {
//           try {
//             const query = 'SELECT * FROM users';
//             const { rows } = await client.query(query);
//             return rows;
//           } catch (error) {
//             throw new Error('Failed to fetch users');
//           }
//         }
//       }
//     }
//   });
  
//   const MutationType = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//       signUp: {
//         type: UserType,
//         args: { input: { type: GraphQLNonNull(SignUpInputType) } },
//         resolve: async (_, { input }) => {
//           const { first, last, email, phone, password, role } = input;
//           try {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             const query =
//               'INSERT INTO users (first, last, email, phone, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
//             const { rows } = await client.query(query, [
//               first,
//               last,
//               email,
//               phone,
//               hashedPassword,
//               role,
//             ]);
//             return rows[0];
//           } catch (error) {
//             throw new Error('Failed to sign up user');
//           }
//         }
//       },
//       updateUser: {
//         type: UserType,
//         args: {
//           id: { type: GraphQLNonNull(GraphQLID) },
//           input: { type: GraphQLNonNull(UpdateUserInputType) }
//         },
//         resolve: async (_, { id, input }) => {
//           try {
//             const { first, last, email, phone, password } = input;
//             const hashedPassword = await bcrypt.hash(password, 10);
//             const query =
//               'UPDATE users SET first = $1, last = $2, email = $3, phone = $4, password = $5 WHERE id = $6 RETURNING *';
//             const { rows } = await client.query(query, [
//               first,
//               last,
//               email,
//               phone,
//               hashedPassword,
//               id,
//             ]);
//             return rows[0];
//           } catch (error) {
//             throw new Error('Failed to update user');
//           }
//         }
//       },
//       deleteUser: {
//         type: GraphQLID,
//         args: { id: { type: GraphQLNonNull(GraphQLID) } },
//         resolve: async (_, { id }) => {
//           try {
//             const query = 'DELETE FROM users WHERE id = $1 RETURNING id';
//             const { rows } = await client.query(query, [id]);
//             return rows[0].id;
//           } catch (error) {
//             throw new Error('Failed to delete user');
//           }
//         }
//       }
//     }
//   });

// const schema = new GraphQLSchema({
//     query: QueryType,
//     mutation: MutationType
//   });

// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   graphiql: true
// }))

// app.listen(5000., () => console.log("Server running"))

//2nd try
//
//
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bcrypt = require('bcrypt');
const { Client } = require('pg');
const cors = require('cors');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList, GraphQLInputObjectType, GraphQLEnumType } = require('graphql');

const app = express();
app.use(cors());

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Bill250605",
  database: "postgres"
});
client.connect(err => {
  if (err) {
    console.error('Failed to connect to the database', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

// Define the Role enum
const RoleType = new GraphQLEnumType({
  name: 'Role',
  values: {
    WORKER: { value: 'WORKER' },
    HIRER: { value: 'HIRER' }
  }
});

// Define your schema
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    first: { type: GraphQLString },
    last: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: RoleType }
  }
});

const SignUpInputType = new GraphQLInputObjectType({
  name: 'SignUpInput',
  fields: {
    first: { type: GraphQLNonNull(GraphQLString) },
    last: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    phone: { type: GraphQLString },
    password: { type: GraphQLNonNull(GraphQLString) },
    role: { type: GraphQLNonNull(RoleType) }
  }
});

const UpdateUserInputType = new GraphQLInputObjectType({
  name: 'UpdateUserInput',
  fields: {
    first: { type: GraphQLString },
    last: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString }
  }
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getUser: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { email, password }) => {
        try {
          const query = 'SELECT * FROM users WHERE email = $1';
          const { rows } = await client.query(query, [email]);
          const user = rows[0];
          if (!user) {
            throw new Error('User not found');
          }
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            throw new Error('Invalid password');
          }
          return user;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to fetch user');
        }
      }
    },
    listUsers: {
      type: GraphQLList(UserType),
      resolve: async () => {
        try {
          const query = 'SELECT * FROM users';
          const { rows } = await client.query(query);
          return rows;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to fetch users');
        }
      }
    }
  }
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signUp: {
      type: UserType,
      args: { input: { type: GraphQLNonNull(SignUpInputType) } },
      resolve: async (_, { input }) => {
        const { first, last, email, phone, password, role } = input;
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const query =
            'INSERT INTO users (first, last, email, phone, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
          const { rows } = await client.query(query, [
            first,
            last,
            email,
            phone,
            hashedPassword,
            role
          ]);
          return rows[0];
        } catch (error) {
          console.error(error);
          throw new Error('Failed to sign up user');
        }
      }
    },
    updateUser: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (_, { email, password }) => {
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const query =
            'UPDATE users SET password = $1 WHERE email = $2 RETURNING *';
          const { rows } = await client.query(query, [
            hashedPassword,
            email
          ]);
          return rows[0];
        } catch (error) {
          console.error(error);
          throw new Error('Failed to update user password');
        }
      }
    },
    deleteUser: {
      type: GraphQLID,
      args: { email: { type: GraphQLNonNull(GraphQLString) } },
      resolve: async (_, { email }) => {
        try {
          const query = 'DELETE FROM users WHERE email = $1 RETURNING id';
          const { rows } = await client.query(query, [email]);
          return rows[0].id;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to delete user');
        }
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(5000, () => console.log("Server running at http://localhost:5000/graphql"));
