"use client";

import { Popover } from "@headlessui/react";
import { Dispatch, SetStateAction, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Spell, SpellDamage, SpellDc } from "../../../graphql/codegen/graphql";
import useMarkdown from "../../../lib/useMarkdown";

import { classesList } from "../../../lib/classesList";
import { abilityScoresList } from "../../../lib/abilityScoresList";
import IconSearch from "../../../ui/icons/IconSearch";

export default function SpellsList({ spells }: { spells: Spell[] }) {
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openedSpells, setOpenedSpells] = useState<string[]>([]);
  const [selectedAbilityScores, setSelectedAbilityScores] = useState<string[]>([]);

  const isSpellOpened = (spell: string) => openedSpells.includes(spell);

  const updateOpenedSpells = (spell: string) =>
    openedSpells.includes(spell)
      ? setOpenedSpells(openedSpells.filter((openedSpell) => spell !== openedSpell))
      : setOpenedSpells([...openedSpells, spell]);

  const isClassSelected = (cls: string) => selectedClasses.includes(cls);

  const updateSelectedClasses = (newClass: string) =>
    isClassSelected(newClass)
      ? setSelectedClasses(selectedClasses.filter((currentClass) => currentClass !== newClass))
      : setSelectedClasses([...selectedClasses, newClass]);

  const isSkillSelected = (skill: string) => selectedAbilityScores.includes(skill);

  const updateSkills = (skill: string) =>
    selectedAbilityScores.includes(skill)
      ? setSelectedAbilityScores(
          selectedAbilityScores.filter((currentSkill) => currentSkill !== skill)
        )
      : setSelectedAbilityScores([...selectedAbilityScores, skill]);

  const filteredSpells = spells
    .filter((spell) =>
      selectedClasses?.length
        ? spell.classes.some((spellClass) => selectedClasses.includes(spellClass.index))
        : spell
    )
    .filter((spell) =>
      selectedAbilityScores?.length
        ? spell.dc?.type.index
          ? selectedAbilityScores.includes(spell.dc?.type.index)
          : undefined
        : spell
    )
    .filter((spell) => {
      if (searchQuery?.length) {
        return (
          spell.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          spell.classes.some((spellClass) =>
            spellClass.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      } else {
        return spell;
      }
    });
  return (
    <div className="mt-12">
      <div className="grid">
        <Header
          selectedClasses={selectedClasses}
          searchQuery={searchQuery}
          updateSelectedClasses={updateSelectedClasses}
          isClassSelected={isClassSelected}
          isAbilityScoreSelected={isSkillSelected}
          updateSkills={updateSkills}
          setSearchQuery={setSearchQuery}
        />
        {filteredSpells?.length ? (
          filteredSpells.map((spell) => (
            <SpellCard
              key={spell.index}
              isOpen={isSpellOpened(spell.index)}
              toggleOpen={() => updateOpenedSpells(spell.index)}
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

function Header({
  selectedClasses,
  updateSelectedClasses,
  updateSkills,
  isClassSelected,
  isAbilityScoreSelected,
  searchQuery,
  setSearchQuery,
}: {
  selectedClasses: string[];
  updateSelectedClasses: (x: string) => void;
  updateSkills: (x: string) => void;
  isClassSelected: (x: string) => boolean;
  isAbilityScoreSelected: (x: string) => boolean;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="grid ">
      <div className="relative flex items-center">
        <IconSearch className="absolute left-2 h-4 w-4" />
        <input
          className="w-3/6 border border-solid border-red-700 py-2 pl-8"
          value={searchQuery}
          placeholder="Search by name, class or ability score"
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>

      <Popover className="relative">
        <Popover.Button className="align-center flex justify-center rounded-[4px] border border-solid border-[#d3d0c9] bg-[#d3d0c9] px-3 hover:bg-green-300">
          Filter by class{!!selectedClasses?.length && ` (${selectedClasses?.length})`}
        </Popover.Button>
        <Popover.Panel className="absolute z-10 bg-slate-50 px-4 py-8">
          {classesList.map((clx) => (
            <div key={clx.index}>
              <input
                type="checkbox"
                id={clx.index}
                name={clx.index}
                checked={isClassSelected(clx.index)}
                onChange={() => updateSelectedClasses(clx.index)}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-green-500"
              />
              <label
                htmlFor={clx.index}
                key={clx.index}
                onClick={() => updateSelectedClasses(clx.index)}
              >
                {clx.name}
              </label>
            </div>
          ))}
        </Popover.Panel>
      </Popover>
      <Popover className="relative">
        <Popover.Button>Ability Score</Popover.Button>
        <Popover.Panel className="absolute z-10 w-[320px] bg-slate-50">
          {abilityScoresList.map((score) => (
            <div key={score.index}>
              <input
                type="checkbox"
                id={score.index}
                name={score.index}
                checked={isAbilityScoreSelected(score.index)}
                onChange={() => updateSkills(score.index)}
              />
              <label htmlFor={score.index}>{score.name}</label>
            </div>
          ))}
        </Popover.Panel>
      </Popover>
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
