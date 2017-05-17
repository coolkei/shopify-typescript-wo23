import {resolve} from 'path';

import graphQLToTypeScriptDefinitions from '../src';

const schemaFile = resolve(__dirname, 'schema.json');
const graphQLFiles = [
  resolve(__dirname, 'Home.graphql'),
  resolve(__dirname, 'SimpleCard.graphql'),
  resolve(__dirname, 'TableCard.graphql'),
];

graphQLToTypeScriptDefinitions({
  schemaFile,
  graphQLFiles,
});
