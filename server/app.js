const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));
app.listen(4000,()=>{
  console.log('now listening for request on port 4000');
});

// Connect to mongoDB Atlas database using the string generated in the cluster in MongoDB Atlas
const db = process.env.MONGODB_DB
mongoose.connect(db);
mongoose.connection.once('open', () => {
  console.log('connected to database');
});
