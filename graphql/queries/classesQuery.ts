import { gql } from 'graphql-request';

export const classesQuery = gql`
  query Classes {
    classes {
      index
      name
      hit_die
      proficiencies {
        index
        name
        classes {
          index
          name
          hit_die
        }
        type
        races {
          index
          name
          ability_bonuses {
            bonus
            ability_score {
              index
              name
              full_name
              desc
            }
          }
        }
      }
      saving_throws {
        index
        name
        full_name
        desc
        skills {
          index
          name
          desc
          ability_score {
            index
            name
            full_name
            desc
          }
        }
      }
      spellcasting {
        info {
          name
          desc
        }
        level
        spellcasting_ability {
          index
          name
          full_name
          desc
        }
      }
      spells {
        index
        area_of_effect {
          type
          size
        }
        attack_type
        casting_time
        components
        concentration
        damage {
          damage_at_slot_level {
            level
            damage
          }
          damage_at_character_level {
            level
            damage
          }
          damage_type {
            index
            name
            desc
          }
        }
        dc {
          success
          type {
            index
            name
            full_name
            desc
          }
          desc
        }
        desc
        duration
        heal_at_slot_level {
          level
          healing
        }
        higher_level
        level
        material
        name
        range
        ritual
        school {
          index
          name
          desc
        }
      }
      starting_equipment {
        quantity
        equipment {
          index
          name
          cost {
            quantity
            unit
          }
          desc
          equipment_category {
            index
            name
            equipment {
              index
              name
              desc
            }
          }
          weight
        }
      }
      class_levels {
        index
        level
        ability_score_bonuses
        class {
          index
          name
          hit_die
        }
        subclass {
          index
          name
          desc
          subclass_flavor
        }
        features {
          index
          name
          level
          desc
          parent {
            index
            name
            level
            desc
            reference
          }
          prerequisites {
            type
            feature {
              index
              name
              level
              desc
              reference
            }
            level
          }
          reference
          feature_specific {
            expertise_options {
              choose
              type
              from {
                option_set_type
              }
            }
            subfeature_options {
              choose
              type
              from {
                option_set_type
              }
            }
            invocations {
              index
              name
              level
              desc
              reference
            }
          }
        }
        prof_bonus
        spellcasting {
          cantrips_known
          spell_slots_level_1
          spell_slots_level_2
          spell_slots_level_3
          spell_slots_level_4
          spell_slots_level_5
          spell_slots_level_6
          spell_slots_level_7
          spell_slots_level_8
          spell_slots_level_9
          spells_known
        }
      }
      subclasses {
        index
        name
        desc
        subclass_flavor
        subclass_levels {
          index
          level
          ability_score_bonuses
          prof_bonus
        }
        spells {
          spell {
            index
            attack_type
            casting_time
            components
            concentration
            desc
            duration
            higher_level
            level
            material
            name
            range
            ritual
          }
        }
      }
      multi_classing {
        prerequisites {
          minimum_score
        }
        prerequisite_options {
          choose
          type
          from {
            option_set_type
            options {
              option_type
              minimum_score
            }
          }
        }
      }
      proficiency_choices {
        desc
        choose
        type
        from {
          option_set_type
        }
      }
      starting_equipment_options {
        choose
        desc
        type
      }
    }
  }
`;
