"use client";

import { Popover } from "@headlessui/react";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Spell, SpellDamage, SpellDc } from "../../../graphql/codegen/graphql";
import useMarkdown from "../../../lib/useMarkdown";

import { classesList } from "../../../lib/classesList";
import { abilityScoresList } from "../../../lib/abilityScoresList";
import IconSearch from "../../../ui/icons/IconSearch";
import create from "zustand";

type State = {
  search: string;
  openedSpells: string[];
  classes: string[];
  levels: string[];
  abilityScores: string[];
};

type Actions = {
  dispatch: (args: Args) => void;
};

type Type = keyof State;
type Args = {
  type: Type;
  item: string;
};

function update(field: keyof Omit<State, "search">, state: State, item: string) {
  return state[field].includes(item)
    ? state[field].filter((fieldItem) => fieldItem !== item)
    : [...state[field], item];
}

function reducer(state: State, { type, item }: Args) {
  switch (type) {
    case "search":
      return { search: item };
    case "abilityScores":
      return {
        abilityScores: update("abilityScores", state, item),
      };
    case "classes":
      return {
        classes: update("classes", state, item),
      };
    case "levels":
      return {
        levels: update("levels", state, item),
      };
    case "openedSpells": {
      return {
        openedSpells: update("openedSpells", state, item),
      };
    }
  }
}

const useFiltersStore = create<State & Actions>((set) => ({
  search: "",
  openedSpells: [],
  abilityScores: [],
  levels: [],
  classes: [],
  dispatch: (args) => set((state) => reducer(state, args)),
}));

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
    .filter((spell) => {
      if (filters.search?.length) {
        return (
          spell.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          spell.classes.some((spellClass) =>
            spellClass.name.toLowerCase().includes(filters.search.toLowerCase())
          )
        );
      } else {
        return spell;
      }
    });
  return (
    <div className="mt-12">
      <div className="grid">
        <Header />
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
    </div>
  );
}

function PopoverButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Popover.Button
      className={[
        className,
        "flex justify-center rounded-[4px] border border-solid bg-[#ededed] px-2 hover:bg-[#e8e8e8]",
      ].join(" ")}
    >
      {children}
    </Popover.Button>
  );
}

function Header() {
  const filters = useFiltersStore();

  function isSelected(state: State, { type, item }: Args): boolean {
    return state[type].includes(item);
  }

  return (
    <div className="grid ">
      <div className="relative flex items-center">
        <IconSearch className="absolute left-2 h-4 w-4" />
        <input
          className="w-3/6 border border-solid border-red-700 py-2 pl-8"
          value={filters.search}
          placeholder="Search by name, class or ability score"
          onChange={(event) => filters.dispatch({ item: event.target.value, type: "search" })}
        />
      </div>
      <div className="flex gap-2">
        <Popover className="relative">
          {({ open }) => (
            <>
              <PopoverButton className={open ? "bg-[#e8e8e8]" : ""}>
                Class{!!filters.classes?.length && ` (${filters.classes?.length})`}
              </PopoverButton>
              <Popover.Panel className="absolute z-10 bg-slate-50 px-4 py-8">
                {classesList.map((clx) => (
                  <div key={clx.index}>
                    <input
                      type="checkbox"
                      id={clx.index}
                      name={clx.index}
                      checked={isSelected(filters, { item: clx.index, type: "classes" })}
                      onChange={() => filters.dispatch({ item: clx.index, type: "classes" })}
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500"
                    />
                    <label htmlFor={clx.index} key={clx.index}>
                      {clx.name}
                    </label>
                  </div>
                ))}
              </Popover.Panel>
            </>
          )}
        </Popover>
        <Popover className="relative">
          <PopoverButton>
            Ability score
            {!!filters.abilityScores?.length && ` (${filters.abilityScores?.length})`}{" "}
          </PopoverButton>
          <Popover.Panel className="absolute z-10 w-[320px] bg-slate-50">
            {abilityScoresList.map((score) => (
              <div key={score.index}>
                <input
                  type="checkbox"
                  id={score.index}
                  name={score.index}
                  checked={isSelected(filters, { item: score.index, type: "abilityScores" })}
                  onChange={() => filters.dispatch({ item: score.index, type: "abilityScores" })}
                />
                <label htmlFor={score.index}>{score.name}</label>
              </div>
            ))}
          </Popover.Panel>
        </Popover>
        <Popover>
          <PopoverButton>Level</PopoverButton>
        </Popover>
      </div>
    </div>
  );
}

function SpellCard({
  spell,
  isOpen,
  toggleOpen,
}: {
  spell: Spell;
  isOpen: boolean;
  toggleOpen: (i: string) => void;
}) {
  const desc = useMarkdown({ markdown: spell.desc });
  return (
    <div onClick={() => toggleOpen(spell.index)}>
      <h3 className={isOpen ? "font-bold" : ""}>{spell.name}</h3>
      <div>{spell.duration && <p>Duraction: {spell.duration}</p>}</div>
      {isOpen && (
        <div>
          {desc.body.map((p) => (
            <ReactMarkdown key={p}>{p}</ReactMarkdown>
          ))}
          {!!desc?.table?.length && (
            <ReactMarkdown className="table-auto" remarkPlugins={[remarkGfm]}>
              {desc.table}
            </ReactMarkdown>
          )}
          {!!spell?.damage && <SpellDmg damage={spell.damage} />}
          {!!spell?.dc?.type.index && <SpellDice dice={spell.dc} />}
        </div>
      )}
    </div>
  );
}

function SpellDmg({ damage }: { damage: SpellDamage }) {
  const type = damage.damage_type?.index ? damage.damage_type : undefined;
  const slot = damage.damage_at_slot_level?.length ? damage.damage_at_slot_level : undefined;
  const character = damage.damage_at_character_level?.length
    ? damage.damage_at_character_level
    : undefined;

  return (
    <div>
      <p>Damage type: {type?.name}</p>
      <p>{type?.desc}</p>
      {character && (
        <div>
          <h3>Damage at character level</h3>
          <div></div>
          {character.map((level) => (
            <>
              <p key={`${level}asd`}>Level: {level.level}</p>
              <p>Damage: {level.damage}</p>
            </>
          ))}
        </div>
      )}
      {slot && (
        <div>
          <h3>Damage at slot level</h3>
          {slot?.map((level) => (
            <>
              <p key={level.damage}>Level: {level.level}</p>
              <p>Damage: {level.damage}</p>
            </>
          ))}
        </div>
      )}
    </div>
  );
}

function SpellDice({ dice }: { dice: SpellDc }) {
  return (
    <div>
      <p>Dice</p>
      {!!dice?.desc?.length && <p>{dice.desc}</p>}
      <p>
        {dice.type.name} — {dice.type.full_name}
      </p>
      <p>{dice.type.desc}</p>
      <p>Success: {dice.success}</p>
    </div>
  );
}
