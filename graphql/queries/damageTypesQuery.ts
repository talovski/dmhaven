import { gql } from 'graphql-request';

export const damageTypesQuery = gql`
  query DamageTypes {
    damageTypes {
      index
      name
      desc
    }
  }
`;
