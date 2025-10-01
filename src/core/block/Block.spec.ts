import { expect } from 'chai';
import Block from './Block';

const TESTING = {
  title: 'Hello WORLD',
  class: 'test-class',
  element: 'section',
  newTitle: 'World not welcome',
};

class TestBlock extends Block<any> {
  constructor(props: { title: string }) {
    super(TESTING.element, TESTING.class, props);
  }

  render(): DocumentFragment {
    const tpl = document.createElement('template');
    tpl.innerHTML = `<div class="wrapper">${this.props.title}</div>`;
    const fragment = tpl.content;

    const childrenFrag = super.render();
    fragment.appendChild(childrenFrag);

    return fragment;
  }

  componentDidUpdate() {
    return true;
  }
}

describe('Block', () => {
  it('block renders', () => {
    const block = new TestBlock({ title: TESTING.title });
    const el = block.getContent();
    expect(el).to.be.instanceOf(HTMLElement);
    expect(el!.tagName.toLowerCase()).to.equal('section');
    expect(el!.className).to.equal('test-class');

    block.init();
    expect(el!.textContent).to.equal(TESTING.title);
  });

  it('block has unique id', () => {
    const block = new TestBlock({ title: TESTING.title });
    const id = block.getId();
    expect(id).to.be.a('string');
    block.init();
    expect(block.getContent()!.getAttribute('data-id')).to.equal(id);
  });

  it('block updates props and rerenders', () => {
    const block = new TestBlock({ title: TESTING.title });
    block.init();
    expect(block.getContent()!.textContent).to.contain(TESTING.title);

    block.setProps({ title: TESTING.newTitle } as any);
    expect(block.getContent()!.textContent).to.contain(TESTING.newTitle);
  });

  it('block show and hide works', () => {
    const block = new TestBlock({ title: TESTING.title });
    block.init();
    const el = block.getContent()!;

    block.hide();
    expect(el.style.display).to.equal('none');

    block.show();
    expect(el.style.display).to.equal('flex');
  });

  it('block destroy removes element', () => {
    const block = new TestBlock({ title: TESTING.title });
    block.init();
    const el = block.getContent()!;

    block.destroy();
    expect(el.isConnected).to.equal(false);
  });

  it('block renders with children', () => {
    const child = new TestBlock({ title: 'Child' });
    const parent = new TestBlock({ title: 'Parent', children: [child] } as any);

    parent.init();
    expect(parent.getContent()!.textContent).to.contain('Parent');
    expect(parent.getContent()!.textContent).to.contain('Child');
  });

  it('updates via props proxy', () => {
    const block = new TestBlock({ title: TESTING.title });
    block.init();
    block.setProps({ title: TESTING.newTitle });
    expect(block.getContent()!.textContent).to.contain(TESTING.newTitle);
  });

  it('calls componentDidUpdate when props change', () => {
    let called = false;
    const block = new TestBlock({ title: TESTING.title });
    (block as any).componentDidUpdate = () => {
      called = true;
      return true;
    };
    block.init();
    block.setProps({ title: TESTING.newTitle } as any);
    expect(called).to.equal(true);
  });

  it('throws on delete prop', () => {
    const block = new TestBlock({ title: TESTING.title });
    block.init();
    expect(() => {
      delete (block as any).props.title;
    }).to.throw('Нельзя удалить свойство');
  });

  it('attaches events even when hidden', () => {
    let clicked = false;
    const block = new TestBlock({
      title: TESTING.title,
      events: {
        click: {
          handler: () => {
            clicked = true;
          },
        },
      },
    } as any);

    block.init();
    const el = block.getContent()!;
    el.click();
    expect(clicked).to.equal(true);

    clicked = false;
    block.hide();
    el.click();
    expect(clicked).to.equal(true);
  });

  it('calls componentDidMount', () => {
    let mounted = false;

    const block = new TestBlock({ title: TESTING.title });
    (block as any).componentDidMount = () => {
      mounted = true;
    };

    block.init();
    block.dispatchComponentDidMount();

    expect(mounted).to.equal(true);
  });
});
