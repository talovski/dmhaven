import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://www.dnd5eapi.co/graphql",
  documents: "graphql/queries/*.ts",
  generates: {
    "graphql/codegen/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;