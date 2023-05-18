import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  overwrite: true,
  schema: './src/gql/schema.graphql',
  documents: ['pages/**/*.tsx', 'components/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './resolvers-types.ts': {
      config:{
        useIndexSignature: true
      },
      plugins: ['typescript', 'typescript-resolvers']
    },
    './src/gql/': {
      preset: 'client'
    }
  }
}
 
export default config