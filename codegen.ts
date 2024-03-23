import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'src/server/graphql/schemas/**/*.graphql',
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      config: {
        skipTypename: true,
        useTypeImports: true
      },
      presetConfig: {
        gqlTagName: 'gql'
      }
    }
  },

  ignoreNoDocuments: true
}

export default config
