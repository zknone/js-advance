export function getTemplate(
  name: string,
  templates: Record<string, string>
): string {
  const key = Object.keys(templates).find((path) =>
    path.includes(`/${name}/${name}.hbs`)
  );

  if (!key) throw new Error(`Template not found for: ${name}`);

  const raw = templates[key];

  return raw;
}
