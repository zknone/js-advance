import type TemplateBlock from '../core/templateBlock/TemplateBlock';

const renderPage = <T extends Record<string, unknown>>(
  page: TemplateBlock<T>,
  rootQuery: string
) => {
  const root = document.querySelector(rootQuery);
  const content = page.getContent();

  if (root && content) {
    root.innerHTML = '';
    root.appendChild(content);
  }

  page.dispatchComponentDidMount();
};

export default renderPage;
