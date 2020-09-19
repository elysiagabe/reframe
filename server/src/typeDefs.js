const { gql } = require('apollo-server')

module.exports = gql`
    type Label {
        id: ID!
        name: String!
        def: String
        example: String
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        token: String!
    }

    type Entry {
        id: ID!
        thought1: String!
        thought2: String
        stress1: Int!
        stress2: Int
        createdAt: String!
        userId: String!
        labels: [String]!
    }

    input RegisterInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    type Query {
        test: String!
        labels: [Label]!
        label(id: ID!): Label

        entry(id: ID!): Entry
        entriesByUser: [Entry]
        entriesByLabel(label: String!): [Entry]

        accountInfo: User
    }

    type Mutation {
        createEntry(thought1: String!, thought2: String!, stress1: Int!, stress2: Int!, labels: [String]): Entry!
        deleteEntry(id: ID!): String! 

        register(registerInput: RegisterInput): User!
        login(email: String!, password: String!): User!
        deleteAcct: User!
    }
`;