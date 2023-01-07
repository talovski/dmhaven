import { client } from "../../../../graphql/client";
import { spellQuery, spellsQuery } from "../../../../graphql/queries/spellsQuery";
import { Spell } from "../../../../graphql/codegen/graphql";

export async function generateStaticParams() {
  const spells = await client.request<{ spells: Spell[] }>(spellsQuery);
  return spells.spells.map((spell) => ({ index: spell.index }));
}

export async function getSpell(index: string) {
  const spell = await client.request<{ spell: Spell }>(spellQuery, {
    index: index,
  });
  return spell.spell;
}

export default async function SpellPage({ params }: { params: { index: string } }) {
  const { index } = params;
  const spell = await getSpell(index);
  console.log("spell", spell);
  return <div>{spell.name}</div>;
}
