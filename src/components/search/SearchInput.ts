import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { SearchProps } from '../../types/chat';

/**
 * SearchInput component for searching within chat items.
 *
 * @param props Props inside: { name: string;
  className?: string;
  value?: string;
  placeholder?: string;
  settings?: Record<string, unknown> }
 */
class SearchInput extends TemplateBlock<SearchProps & Record<string, unknown>> {
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

    super('searchInput', {
      ...defaultProps,
      ...props,
      settings: {
        withInternalID: true,
      },
    });
  }

  render() {
    return this.compile('searchInput', this.props);
  }
}

export default SearchInput;
