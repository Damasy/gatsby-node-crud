const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList
} = require('graphql')

const students = require('./db')

const Data = new GraphQLObjectType({
  name: 'Data',
  fields: () => {
    return {
      title: {type: GraphQLString},
      roll: {type: GraphQLString},
      class_name: {type: GraphQLString},
      scholl: {type: GraphQLString},
      phone: {type: GraphQLString}
    }
  }
});

const Fetch = new GraphQLObjectType({
  name: 'feth_data',
  fields: {
    Fdata: {
      type: new GraphQLList(Data),
      resolve(parent, args) {
        const Data = students.find()
        return Data;
      }
    }
  }
})

const Datastore = {
  type: Data,
  args: {
    title: {type: GraphQLString},
    roll: {type: GraphQLString},
    class_name: {type: GraphQLString},
    scholl: {type: GraphQLString},
    phone: {type: GraphQLString}
  },
  resolve(parent, args) {
    const Data = new students({
      title: args.title,
      roll: args.roll,
      class_name: args.class_name,
      scholl: args.scholl,
      phone: args.phone
    })
    Data.save();
    return Data;
  }
}

const Update = {
  type: Data,
  args: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    roll: {type: GraphQLString},
    class_name: {type: GraphQLString},
    scholl: {type: GraphQLString},
    phone: {type: GraphQLString}
  },
  resolve(parent, args) {
    const Data = students.findOneAndUpdate({_id: args._id}, {
      title: args.title,
      roll: args.roll,
      class_name: args.class_name,
      scholl: args.scholl,
      phone: args.phone
    });
    return Data;
  }
}

const Delete = {
  type: Data,
  args: {
    _id: {type: GraphQLString}
  },
  resolve(parent, args) {
    const Data = students.findOneAndRemove({_id: args._id});
    return Data;
  }
}

const mutation = new GraphQLObjectType({
  name: 'datastore',
  fields: () => {
    return {
      Datamut: Datastore,
      Updatedata: Update,
      Deletedata: Delete
    }
  }
});

module.exports = new GraphQLSchema({
  mutation,
  query: Fetch
})