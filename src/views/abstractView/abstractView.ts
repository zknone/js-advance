import type AbstractView from '../../types/views/AbstractView';

export abstract class AbstractViewImpl<T> extends HTMLElement implements AbstractView<T> {
  state: T | null;
  constructor() {
    super();
    this.state = null as unknown as T;
  }

  createHtml() {
    return null;
  }

  render({ selector, outerHtml }: { selector: string; outerHtml?: string }) {
    if (outerHtml) {
      const element = this.querySelector(selector);

      if (element) {
        element.outerHTML = String(outerHtml);
      } else {
        throw new Error("Selector wasn't found");
      }
    } else {
      this.innerHTML = String(this.createHtml());
    }
  }

  notify<D>(type: string, detail: D | null = null) {
    const cancelable = true;
    const bubbles = true;

    const event = new CustomEvent(type, { detail, cancelable, bubbles });
    return this.dispatchEvent(event);
  }

  shake(options: { timeline: AnimationTimeline; id: string }) {
    const keyframes = {
      transform: [0, -5, 0, 5, 0].map((it) => `translateX(${it}px)`),
    };

    return this.animate(keyframes, {
      duration: 150,
      iterations: 4,
      ...options,
    });
  }
}
