import { gql } from "graphql-request";

export const spellsQuery = gql`
  query SpellsQuery {
    spells {
      area_of_effect {
        size
        type
      }
      attack_type
      casting_time
      level
      classes {
        index
        hit_die
        name
        saving_throws {
          desc
          index
          name
          full_name
        }
        # spellcasting {
        #   info {
        #     desc
        #     name
        #   }
        #   level
        #   spellcasting_ability {
        #     desc
        #     index
        #     name
        #     full_name
        #   }
        # }
        # # class_levels {
        #   class {
        #     name
        #     index
        #   }
        #   index
        # level
        # prof_bonus
        #   subclass {
        #     index
        #     name
        #     desc
        #     subclass_flavor
        #   }
        # }
      }
      components
      concentration
      # damage {
      #   damage_at_character_level {
      #     damage
      #     level
      #   }
      #   damage_at_slot_level {
      #     damage
      #     level
      #   }
      #   damage_type {
      #     desc
      #     index
      #     name
      #   }
      # }
      dc {
        desc
        success
        type {
          desc
          full_name
          index
          name
        }
      }
      desc
      # duration
      # heal_at_slot_level {
      #   healing
      #   level
      # }
      # higher_level
      index
      # level
      # material
      name
      # range
      # ritual
      # school {
      #   desc
      #   index
      #   name
      # }
    }
  }
`;

export const spellQuery = gql`
  query SpellQuery($index: String) {
    spell(index: $index) {
      index
      name
      desc
    }
  }
`;
