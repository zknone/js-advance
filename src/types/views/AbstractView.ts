export default interface AbstractView<T> extends HTMLElement {
  state: T | null;
}
