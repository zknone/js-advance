import Handlebars from 'handlebars';
import extractNameFromPath from './extractNameFromPath';

export default function registerPartials(templates: Record<string, string>) {
  const data = Object.entries(templates);

  Handlebars.registerHelper('eq', (a, b) => a === b);

  data.map(([path, template]) => {
    const name = extractNameFromPath(path);
    if (name) Handlebars.registerPartial(name, template);
    return null;
  });
}
