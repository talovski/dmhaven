import { gql } from 'graphql-request';

export const equipmentQuery = gql`
  query Equipment {
    equipment {
      equipment_category {
        equipment {
          ... on MagicItem {
            rarity
          }
          ... on Tool {
            tool_category {
              index
              name
            }
            weight
          }
          ... on Gear {
            gear_category {
              index
              name
            }
          }
          ... on Pack {
            contents {
              item {
                name
                index
                desc
              }
              quantity
            }
          }
          ... on Ammunition {
            quantity
          }
          ... on Weapon {
            category_range {
              index
              name
            }
            damage {
              damage_dice
              damage_type {
                desc
                index
                name
              }
            }
            properties {
              desc
              index
              name
            }
            range {
              long
              normal
            }
            special
            throw_range {
              long
              normal
            }
            two_handed_damage {
              damage_dice
              damage_type {
                # desc
                index
                name
              }
            }
            weapon_category {
              index
              name
            }
            weapon_range
          }
          ... on Armor {
            armor_category {
              index
              name
            }
            armor_class {
              dex_bonus
              max_bonus
              base
            }
            stealth_disadvantage
            str_minimum
          }
          ... on Vehicle {
            capacity
            speed {
              quantity
              unit
            }
            vehicle_category {
              index
              name
            }
          }
        }
      }
    }
  }
`;
