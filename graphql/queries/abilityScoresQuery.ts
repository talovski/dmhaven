import { gql } from "graphql-request";

export const abilityScoresQuery = gql`
  query AbilityScores {
    abilityScores {
      desc
      full_name
      index
      name
      skills {
        desc
        index
        name
      }
    }
  }
`;