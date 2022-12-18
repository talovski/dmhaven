import { gql } from "graphql-request";

export const skillsQuery = gql`
  query Skills {
    skills {
      name
      index
      desc
      ability_score {
        desc
        full_name
        name
        index
      }
    }
  }
`;