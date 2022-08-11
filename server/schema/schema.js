const graphql = require('graphql');
const { GraphQLString,  GraphQLInt } = graphql;

const TaskType = new graphql.GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLInt },
    description: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
  }),
});
