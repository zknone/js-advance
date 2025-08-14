import type TemplateBlock from '../core/templateBlock/TemplateBlock';

const renderPage = <T extends Record<string, unknown>>(page: TemplateBlock<T>) => {
  const root = document.getElementById('app');

  const content = page.getContent();
  if (root && content) {
    root.appendChild(content);
  }

  page.dispatchComponentDidMount();
};

export default renderPage;
