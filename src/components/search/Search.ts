/* eslint-disable no-console */
import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { SearchProps } from '../../types/chat';

class Search extends TemplateBlock<SearchProps & Record<string, unknown>> {
  constructor(props: SearchProps) {
    const defaultProps: Partial<SearchProps> = {
      value: '',
      className: 'search',
      placeholder: 'Поиск',
      name: 'search',
      settings: {
        withInternalID: true,
      },
    };

    const tagName = 'form';
    const tagClassName = 'search';

    super(
      'search',
      {
        ...defaultProps,
        ...props,
        events: {
          input: {
            handler: (e: Event) => {
              const target = e.target as HTMLInputElement;
              this.props.value = target.value;
            },
          },
        },
      },
      tagName,
      tagClassName
    );
  }

  render() {
    return this.compile('search', this.props);
  }
}

export default Search;
