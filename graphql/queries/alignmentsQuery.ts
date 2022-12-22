import { gql } from "graphql-request";

export const alignmentsQuery = gql`
  query Alignments {
    alignments {
      abbreviation
      desc
      index
      name
    }
  }
`;
