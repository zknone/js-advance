import Handlebars from 'handlebars';
import extractNameFromPath from '../../utils/extractNameFromPath';

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
    this.registerPartials();
  }

  static init(templates: Record<string, string>, pages: Record<string, string>) {
    if (!TemplateEngine.registry) {
      TemplateEngine.registry = new TemplateEngine(templates, pages);
    }
    return TemplateEngine.registry;
  }

  static getRegistry(): TemplateEngine {
    if (!TemplateEngine.registry) {
      throw new Error('TemplateEngine not initialized');
    }
    return TemplateEngine.registry;
  }

  registerPartials() {
    const data = Object.entries(this.templates);

    Handlebars.registerHelper('eq', (a, b) => a === b);

    data.forEach(([path, template]) => {
      const name = extractNameFromPath(path);
      if (name) Handlebars.registerPartial(name, template);
    });
  }

  getAllTemplates() {
    return this.templates;
  }

  renderComponent<T>(
    templateName: string,
    data: Record<string, T>,
    currentTemplates = this.templates
  ): string {
    const templateString = getTemplateFrom(templateName, currentTemplates);
    const compiled = Handlebars.compile(templateString);
    return compiled(data);
  }

  renderPage<T>(pageName: string, pageData: Record<string, T>) {
    const html = this.renderComponent(pageName, pageData, this.pages);

    const app = document.querySelector('#app')!;

    if (!app) {
      throw new Error('App container not found in DOM');
    }

    app.innerHTML = html;
  }
}

export default TemplateEngine;
