import { client } from "../../../graphql/client";
import { Spell } from "../../../graphql/codegen/graphql";
import { spellsQuery } from "../../../graphql/queries/spellsQuery";
import SpellsList from "./SpellsList";

async function getSpells() {
  const res = await client.request<{ spells: Spell[] }>(spellsQuery);
  if (!res) throw new Error("Something went wrong on our side");
  return res.spells;
}

export default async function Spells() {
  const spells = await getSpells();

  return (
    <div>
      <SpellsList spells={spells} />
    </div>
  );
}
