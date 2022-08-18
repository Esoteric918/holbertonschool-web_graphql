const graphql = require("graphql"),
  { GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull } = graphql;

const Project = require('../models/project');
const Task = require('../models/task');
//require the module: lodash
const _ = require("lodash");


const RootQuery = new graphql.GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        return _.find(Task, { id: args.id });
      },
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return _.find(Project, { id: args.id });
      },
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: () => Task.find({}),
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: () => Project.find({}),
    },
  }),
});

const TaskType = new graphql.GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    project: {
      type: TaskType,
      resolve: (parent, args) => {
        return _.find(Project, { id: parent.projectId });
      },
    },
  }),
});

const ProjectType = new graphql.GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: (parent, args) => {
        return _.filter(Task, { projectId: parent.id });
      },
    },
  }),
});

const Mutation = new graphql.GraphQLObjectType({
  name:"Mutation",
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const newPro = new Project({
          title: args.title,
          weight: args.weight,
          description: args.description,
        });
        return newPro.save();
      }
    },
    addTask: {
      type: TaskType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const newTask = new Task({
          title: args.title,
          weight: args.weight,
          description: args.description,
          projectId: args.projectId,
        });
        return newTask.save();
      }
    }
  }
});

const schema = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
