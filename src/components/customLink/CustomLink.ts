import router from '../../core/routerEngine/router';
import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { CustomLinkProps } from '../../types/chat';

class CustomLink extends TemplateBlock<CustomLinkProps> {
  constructor(props: CustomLinkProps) {
    const defaultProps: Partial<CustomLinkProps> = {
      text: '',
      settings: {
        withInternalID: true,
      },
    };

    const tagName = 'a';
    const tagNameClass = 'custom-link';

    super(
      'customLink',
      {
        ...defaultProps,
        ...props,
        settings: {
          withInternalID: true,
        },
        events: {
          click: {
            handler(e: Event) {
              e.preventDefault();
              router.go({ pathname: props.href, query: { editing: 'view' } });
            },
          },
        },
      },
      tagName,
      tagNameClass
    );
  }

  render() {
    return this.compile('customLink', this.props);
  }
}

export default CustomLink;
