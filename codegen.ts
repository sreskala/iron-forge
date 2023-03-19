import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["src/graphql/**/*.graphql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/generated/graphql.tsx": {
      plugins: ['typescript', 'typescript-operations','typescript-react-apollo'],
    },
  },
};

export default config;
