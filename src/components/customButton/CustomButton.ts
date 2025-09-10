import router from '../../core/routerEngine/router';
import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { ButtonVariants, Colors, CustomButtonProps } from '../../types/chat';

class CustomButton extends TemplateBlock<CustomButtonProps> {
  constructor(props: CustomButtonProps) {
    const defaultProps: Partial<CustomButtonProps> = {
      type: 'button',
      variant: 'primary',
      color: 'blue',
    };

    const resultedProps = {
      ...defaultProps,
      ...props,
      settings: {
        withInternalID: true,
      },
    };

    const { color, variant } = resultedProps;

    const additionalColorClasses: Record<Colors, string> = {
      blue: 'custom-button--color-blue',
      red: 'custom-button--color-red',
      white: 'custom-button--color-white',
    };

    const additionalVariantClasses: Record<ButtonVariants, string> = {
      primary: '',
      icon: 'custom-button--icon',
      link: 'custom-button--link',
    };

    const tagName = variant === 'link' ? 'a' : 'button';
    const tagClassName = `custom-button ${color ? additionalColorClasses[color] : ''}  ${variant ? additionalVariantClasses[variant] : ''}`;

    const clickHandler = (e: Event) => {
      const { path, onClick } = resultedProps;
      if (path && variant === 'link') {
        e.preventDefault();
        if (onClick) {
          onClick();
        }
        console.log({ path });
        router.go(path);
      } else if (onClick) {
        onClick();
      }
    };

    super(
      'customButton',
      {
        ...resultedProps,
        events: {
          ...(resultedProps.events ?? {}),
          click: { handler: clickHandler },
        },
      },
      tagName,
      tagClassName
    );
  }

  render() {
    return this.compile('customButton', this.props);
  }
}

export default CustomButton;
