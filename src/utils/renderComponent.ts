import Handlebars from 'handlebars';
import { getTemplate } from './getTemplate';

export async function renderComponent<T>(
  name: string,
  templates: Record<string, string>,
  data: T
): Promise<string> {
  const templateString = getTemplate(name, templates);
  const compiled = Handlebars.compile(templateString);
  return compiled(data);
}
