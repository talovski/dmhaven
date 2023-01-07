import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { Spell, SpellDamage, SpellDc } from "../../../graphql/codegen/graphql";
import useMarkdown from "../../../lib/useMarkdown";
import { useFiltersStore } from "./store";
import IconChevron from "../../../ui/icons/IconChevron";
import clsx from "clsx";

type Props = {
  spell: Spell;
  isOpen: boolean;
  toggleOpen: (i: string) => void;
};

export default function SpellCard({ spell, isOpen, toggleOpen }: Props) {
  const desc = useMarkdown({ markdown: spell.desc });
  return (
    <div className="border-b-[1px] border-[#dddddd] text-xl last:border-none">
      <div
        onClick={() => toggleOpen(spell.index)}
        className="flex cursor-pointer items-center gap-2 hover:bg-amber-50"
      >
        <IconChevron className={isOpen ? "rotate-90" : ""} />
        <h3 className={clsx("font-dmsans text-xl", isOpen ? "font-bold" : "")}>{spell.name}</h3>
      </div>
      {spell.duration && (
        <div>
          <p>Duration: {spell.duration}</p>
        </div>
      )}
      {isOpen && (
        <div className="max-w-prose px-5 pb-5">
          {desc.body.map((p) => (
            <ReactMarkdown key={p}>{p}</ReactMarkdown>
          ))}
          {!!desc?.table.length && (
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
