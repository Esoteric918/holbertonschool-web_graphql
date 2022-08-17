
const express = require('express');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');


const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));
app.listen(4000,()=>{
  console.log('now listening for request on port 4000');
});

const db =  "mongodb+srv://nova:myBalls@cluster0.th3rlbb.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('connected to database');
});
