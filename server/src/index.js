const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { MONGODB } = require('../config.js');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB successfully')
        return server.listen({ port: 4000 })
    })
    .then((res) => {
        console.log(`🚀 server up & running at ${res.url}`)
    })
    .catch(console.error)
