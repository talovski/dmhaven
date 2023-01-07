import { client } from "../../../graphql/client";
import { AbilityScore } from "../../../graphql/codegen/graphql";
import { abilityScoresQuery } from "../../../graphql/queries/abilityScoresQuery";
import useMarkdown from "../../../lib/useMarkdown";
import Link from "next/link";

export async function getData() {
  const data = await client.request<{ abilityScores: AbilityScore[] }>(abilityScoresQuery);
  return data.abilityScores;
}

export default async function AbilityScores() {
  const abilityScores = await getData();
  return abilityScores.map((score) => (
    <div
      key={score.index}
      className="mt-4 border-b-[1px] border-[#dddddd] pb-2 text-xl last:border-none"
    >
      <h3 className="font-dmsans text-xl font-bold">
        {score.full_name} ({score.name})
      </h3>
      {score.desc.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {!!score?.skills.length && (
        <>
          <h3 className="mt-2 text-base font-bold">Skills</h3>
          {score.skills.map((skill) => (
            <div className="text-base" key={skill.index}>
              <p className="underline underline-offset-4" key={skill.index}>
                <Link href={"library/skills/" + skill.index}>{skill.name}</Link>
              </p>
              {/*<div className="text-base">*/}
              {/*  {skill.desc.map((p) => (*/}
              {/*    <p key={p}>{p}</p>*/}
              {/*  ))}*/}
              {/*</div>*/}
            </div>
          ))}
        </>
      )}
    </div>
  ));
}
