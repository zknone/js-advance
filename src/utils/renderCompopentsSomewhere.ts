import type TemplateBlock from '../core/templateBlock/TemplateBlock';

const renderComponentSomewhere = <T extends Record<string, unknown>>(
  target: string | HTMLElement,
  child: TemplateBlock<T>
) => {
  const place =
    typeof target === 'string'
      ? document.querySelector(target)
      : target instanceof HTMLElement
        ? target
        : null;

  const content = child.getContent();
  if (place && content) {
    place.appendChild(content);
  }

  child.dispatchComponentDidMount();
};

export default renderComponentSomewhere;
