import Handlebars from "handlebars";

export function getTemplate(
  name: string,
  templates: Record<string, string>
): string {
  const key = Object.keys(templates).find((path) =>
    path.includes(`/components/${name}/${name}.hbs`)
  );

  if (!key) throw new Error(`Template not found for: ${name}`);

  const raw = templates[key];

  console.log("компайлед", raw);
  return raw;
}
