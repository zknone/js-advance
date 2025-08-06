import type TemplateBlock from '../core/templateBlock/TemplateBlock';

const renderComponentSomewhere = (query: string, child: TemplateBlock<Record<string, unknown>>) => {
  const place = document.querySelector(query);

  const content = child.getContent();
  if (place && content) {
    place.appendChild(content);
    child.dispatchComponentDidMount();
  }
};

export default renderComponentSomewhere;
