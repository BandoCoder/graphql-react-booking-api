const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    type RootQuery {
        events: [String!]!

    }
    type RootMutation {
        createEvent(name: String): String
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
      events: () => {
        return ["Romantic Cooking", "Sailing", "All-night coding"];
      },
      createEvent: (args) => {
        const eventName = args.name;
        return eventName;
      },
    },
  })
);

app.listen(3000);
