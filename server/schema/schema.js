const graphql = require('graphql'),
	{ GraphQLString,  GraphQLInt, GraphQLID } = graphql;

//require the module: lodash
const _ = require('lodash');

const tasks = [
	{	id: '1',
		title: 'Create your first webpage',
		weight: 1,
		description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)',
    projects: ['1']

	},
	{ id: '2',
    title: 'Structure your webpage',
    weight: 1,
    description: 'Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order',
    projects: ['1']
  }
];

const projects = [
  {	id: '1',
    title: 'Advanced HTML',
     weight: 1,
     description: 'Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don’t worry, the final page will be “ugly” it’s normal, it’s not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!'
    },
  {	id: '2',
    title: "Bootstrap",
    weight: 1,
    description: 'Bootstrap is a free and open-source front-end web framework for developing with HTML, CSS, and JS. It contains HTML, CSS, and JS components for faster and easier web development. Bootstrap is the world’s most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.'
  }
  ]

const TaskType = new graphql.GraphQLObjectType({
	name: 'Task',
	fields: () => ({
		id: { type: GraphQLString },
		description: { type: GraphQLString },
		title: { type: GraphQLString },
		weight: { type: GraphQLInt },
    project: {
      type: TaskType,
      resolve: (parent, args) => {
        return _.find(projects, { id: parent.id })
    }
    }
	}),
});

const ProjectType = new graphql.GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    task: {
      type: new graphql.GraphQLList(TaskType),
      resolve: (parent, args) => {
        return _.filter(tasks, { project: parent.id })
      }
    }
  })
});



const RootQuery = new graphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (parent, args) => {
        return _.find(tasks, { id: args.id });
      }
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (parent, args) => {
        return _.find(projects, { id: args.id });
      }
    }
  })
});


module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
});
