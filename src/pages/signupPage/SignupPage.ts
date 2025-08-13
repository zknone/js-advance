import TemplateBlock from '../../core/templateBlock/TemplateBlock';
import type { AdditionalField, BlockBasics } from '../../types/core';

type SignupPageProps = BlockBasics<AdditionalField>;
/**
 * LoadingErrorPage
 *
 * @param props Props inside: {}
 */
class SignupPage extends TemplateBlock<SignupPageProps> {
  //   constructor(props: SignupPageProps) {
  //     const defaultProps: Partial<SignupPageProps> = {};
  //     super(Page.SIGN_UP, {
  //       ...defaultProps,
  //       ...props,
  //       settings: {
  //         withInternalID: true,
  //       },
  //     });
  //   }
  //   render() {
  //     // this.children.customLink = new CustomLink(this.props.customLink);
  //     return this.compile(Page.SIGN_UP, this.props);
  //   }
}

export default SignupPage;
