const {ApolloServer, PubSub} = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const {MONGODB} = require('./config')

const pubSub = new PubSub()

const PORT = process.env.port || 5000

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubSub})
})

mongoose.connect(MONGODB, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(()=> {
        console.log('MongoDB Connected');
        return server.listen({port: PORT})
    }).then((res) => {
    console.log(`Server running at ${res.url}`);
})

