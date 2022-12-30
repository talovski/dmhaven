import { atom } from "jotai";
import { client } from "../../../graphql/client";
import { Spell } from "../../../graphql/codegen/graphql";
import { spellsQuery } from "../../../graphql/queries/spellsQuery";

export async function fetchSpells() {
  const res = await client.request<{ spells: Spell[] }>(spellsQuery);
  return res.spells;
}

export const spellsAtom = atom((get) => {
  return fetchSpells();
});
