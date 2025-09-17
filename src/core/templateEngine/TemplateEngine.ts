import Handlebars from 'handlebars';

import GuardProperty from '../../utils/decorators/guardProperty';

const getTemplateFrom = (templateName: string, templates: Record<string, string>): string => {
  const key = Object.keys(templates).find((path) =>
    path.includes(`/${templateName}/${templateName}.hbs`)
  );
  if (!key) throw new Error(`Template not found for: ${templateName}`);
  return templates[key];
};

class TemplateEngine {
  private static registry: TemplateEngine;

  private templates: Record<string, string>;

  private pages: Record<string, string>;

  private constructor(templates: Record<string, string>, pages: Record<string, string>) {
    this.templates = templates;
    this.pages = pages;
  }

  static init(templates: Record<string, string>, pages: Record<string, string>) {
    if (!TemplateEngine.registry) {
      TemplateEngine.registry = new TemplateEngine(templates, pages);
    }
    return this.getRegistry();
  }

  @(GuardProperty<typeof TemplateEngine>()('getRegistry', 'TemplateEngine not initialized'))
  static getRegistry(): TemplateEngine {
    return TemplateEngine.registry;
  }

  getAllTemplates() {
    return this.templates;
  }

  renderComponent<T>(
    templateName: string,
    data: Record<string, T>,
    currentTemplates = { ...this.templates, ...this.pages }
  ): string {
    const templateString = getTemplateFrom(templateName, currentTemplates);
    const compiled = Handlebars.compile(templateString);
    return compiled(data);
  }
}

export default TemplateEngine;
