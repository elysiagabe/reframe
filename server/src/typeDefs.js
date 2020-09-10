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
        email: String!
        token: String!
    }

    input RegisterInput {
        email: String!
        password: String!
        confirmPassword: String!
    }

    type Query {
        test: String!
        labels: [Label]!
        label(id: ID!): Label
    }

    type Mutation {
        createLabel(name: String!): Label!

        register(registerInput: RegisterInput): User!

        login(email: String!, password: String!): User!
    }
`;