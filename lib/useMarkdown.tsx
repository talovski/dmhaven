export default function useMarkdown({ markdown }: { markdown: string[] }) {
  let table: string[] = [];
  let body: string[] = [];

  markdown.forEach((p: string, i) => {
    if (p.startsWith("|") && p.endsWith("|")) {
      table.push(p);
    } else {
      body.push(p);
    }
  });
  return {
    table: table.join("\n"),
    body: body,
  };
}
