import { gql } from "graphql-request";

export const spellsQuery = gql`
  query SpellsQuery {
    spells {
      index
      name
      desc
    }
  }
`;
