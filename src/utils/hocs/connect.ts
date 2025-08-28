import type Block from '../../core/block/Block';
import type { BlockBasics, AdditionalField } from '../../types/core';
import store, { StoreEvents } from '../../core/store/store';

function connect<P extends BlockBasics<AdditionalField>>(
  Component: new (...args: any[]) => Block<P>
) {
  return class extends Component {
    constructor(...args: any[]) {
      super(...args);

      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...store.getState() } as unknown as P);
      });
    }
  };
}

export default connect;
