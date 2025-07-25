import Handlebars from "handlebars";
import { getTemplate } from "./getTemplate";

export async function renderComponent(
  name: string,
  templates: Record<string, string>,
  data: any
): Promise<string> {
  const templateString = getTemplate(name, templates);
  console.log("template:", templateString);
  console.log("type:", typeof templateString);
  const compiled = Handlebars.compile(templateString);

  console.log(compiled);

  return compiled(data);
}
