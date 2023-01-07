"use client";

import { Spell } from "../../../graphql/codegen/graphql";
import { useFiltersStore } from "./store";
import SpellCard from "./SpellCard";
import SpellsHeader from "./SpellsHeader";

export default function SpellsList({ spells }: { spells: Spell[] }) {
  const filters = useFiltersStore();

  const isSpellOpened = (spell: string) => filters.openedSpells.includes(spell);

  const filteredSpells = spells
    .filter((spell) =>
      filters.classes?.length
        ? spell.classes.some((spellClass) => filters.classes.includes(spellClass.index))
        : spell
    )
    .filter((spell) =>
      filters.abilityScores?.length
        ? spell.dc?.type.index
          ? filters.abilityScores.includes(spell.dc?.type.index)
          : undefined
        : spell
    )
    .filter((spell) =>
      filters.levels?.length ? filters.levels.includes(spell.level.toString()) : spell
    )
    .filter((spell) =>
      filters.search?.length
        ? spell.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          spell.classes.some((spellClass) =>
            spellClass.name.toLowerCase().includes(filters.search.toLowerCase())
          )
        : spell
    );

  return (
    <>
      <SpellsHeader />
      <div className="border-b-2 border-amber-900 pt-2 last:border-none">
        {filteredSpells?.length ? (
          filteredSpells.map((spell) => (
            <SpellCard
              key={spell.index}
              isOpen={isSpellOpened(spell.index)}
              toggleOpen={() => filters.dispatch({ item: spell.index, type: "openedSpells" })}
              spell={spell}
            />
          ))
        ) : (
          <p>No spells found</p>
        )}
      </div>
    </>
  );
}
