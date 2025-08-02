export abstract class AbstractModelImpl extends EventTarget {
  notify<D>(type: string, detail: D | null = null) {
    const event = new CustomEvent(type, { detail });
    return this.dispatchEvent(event);
  }
}
