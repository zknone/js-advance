import type TemplateBlock from '../core/templateBlock/TemplateBlock';
import type { Indexed } from '../types/core';

const renderPage = <T extends Record<string, unknown>>(
  page: TemplateBlock<T>,
  rootQuery: Indexed
) => {
  const root = document.getElementById('app');
  const content = page.getContent();

  if (root && content) {
    root.innerHTML = '';
    root.appendChild(content);
  }

  if (typeof (page as any).setProps === 'function') {
    (page as any).setProps(rootQuery);
  }

  page.dispatchComponentDidMount();
};

export default renderPage;
