const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./components/schema');


// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

const app = express();
const PORT = 4000

require("./components/db")
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))
app.listen(PORT, () => console.log(`app running on port ${PORT}!`))