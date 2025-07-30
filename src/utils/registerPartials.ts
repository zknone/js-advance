import extractNameFromPath from './extractNameFromPath';
import Handlebars from 'handlebars';
export default function registerPartials(templates: Record<string, string>) {
  const data = Object.entries(templates);

  Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
  });

  data.map(([path, template]) => {
    const name = extractNameFromPath(path);
    if (name) Handlebars.registerPartial(name, template);
  });
}
