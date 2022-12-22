import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { client } from "../../../graphql/client";
import { Spell } from "../../../graphql/codegen/graphql";
import { spellsQuery } from "../../../graphql/queries/spellsQuery";
import useMarkdown from "../../../lib/useMarkdown";

async function getSpells() {
  const res = await client.request<{ spells: Spell[] }>(spellsQuery);
  return res.spells;
}

export default async function Spells() {
  const spells = await getSpells();
  return (
    <div>
      {spells.map((spell) => (
        <SpellCard key={spell.index} spell={spell} />
      ))}
    </div>
  );
}

function SpellCard({ spell }: { spell: Spell }) {
  const desc = useMarkdown({ markdown: spell.desc });
  return (
    <div>
      <h3>{spell.name}</h3>
      <div></div>
      <div>
        {desc.body.map((p) => (
          <ReactMarkdown key={p}>{p}</ReactMarkdown>
        ))}
        {!!desc?.table?.length && (
          <ReactMarkdown className="table-auto" remarkPlugins={[remarkGfm]}>
            {desc.table}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
