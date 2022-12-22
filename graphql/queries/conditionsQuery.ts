import { gql } from 'graphql-request';

export const conditionsQuery = gql`
  query Conditions {
    conditions {
      index
      name
      desc
    }
  }
`;
