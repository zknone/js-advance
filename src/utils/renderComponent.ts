import Handlebars from "handlebars";
import { getTemplate } from "./getTemplate";

export async function renderComponent(
  name: string,
  templates: Record<string, string>,
  data: any
  // styles?: Record<string, string>
): Promise<string> {
  // if (styles) {
  //   const styleName = `/${name}/${name}.scss`;

  //   const styleKey = Object.keys(styles).find((path) =>
  //     path.includes(styleName)
  //   );

  //   if (styleKey) {
  //     await import(`../${styleKey}`);
  //   } else {
  //     console.warn(`⚠️ No style found for ${name}`);
  //   }
  // }
  const templateString = getTemplate(name, templates);
  const compiled = Handlebars.compile(templateString);
  return compiled(data);
}
