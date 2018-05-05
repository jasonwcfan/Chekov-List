var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

const _ISSUES = [
  {
    patientName: 'John Doe',
    roomNumber: 'D1',
    doctorName: 'Doctor Strange',
    issueDescription: 'something is wrong',
    status: 'New'
  },
  {
    patientName: 'Alex Smith',
    roomNumber: 'D2',
    doctorName: 'Doctor Manhattan',
    issueDescription: 'bad poo poo',
    status: 'New'
  },
  {
    patientName: 'Mary Jane',
    roomNumber: 'D3',
    doctorName: 'Doctor Doom',
    issueDescription: 'everything hurts',
    status: 'New'
  }
]

var schema = buildSchema(`
  type Query {
    issues: [Issue]
  }
  
  type Issue {
    patientName: String!
    roomNumber: String!
    doctorName: String!
    issueDescription: String!
    status: String!
  }
`);

var root = {
  issues: () => {
    return _ISSUES;
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');