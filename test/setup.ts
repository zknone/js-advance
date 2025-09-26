/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { IStore } from 'types/store';
import store from '../src/core/store/store';
import TemplateEngine from '../src/core/templateEngine/TemplateEngine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dom = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>', {
  url: 'http://localhost/',
});

const { window } = dom;

const cloneStoreState = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const baseStartingState: IStore = {
  query: { id: null, editing: 'view' },
  user: {
    id: 0,
    first_name: '',
    second_name: '',
    display_name: null,
    phone: '',
    login: '',
    avatar: null,
    email: '',
  },
  chats: [],
  messages: {},
  auth: {
    error: null,
    loading: false,
  },
  chatsArchived: [],
};

const baseUnauthorizedState: IStore = {
  auth: null,
  user: null,
  chats: null,
  chatsArchived: null,
  messages: null,
  query: { id: null, editing: 'view' },
};

const startingStateForTest = () => cloneStoreState(baseStartingState);

const unauthorizedStateForTest = () => cloneStoreState(baseUnauthorizedState);

Object.assign(global, {
  window,
  document: window.document,
  Node: window.Node,
  HTMLElement: window.HTMLElement,
  HTMLTemplateElement: window.HTMLTemplateElement,
  HTMLButtonElement: window.HTMLButtonElement,
  HTMLAnchorElement: window.HTMLAnchorElement,
  DocumentFragment: window.DocumentFragment,
  Event: window.Event,
  CustomEvent: window.CustomEvent,
  PopStateEvent: window.PopStateEvent,
});

Object.defineProperty(global, 'navigator', {
  value: window.navigator,
  configurable: true,
});

Object.defineProperties(global, {
  history: {
    configurable: true,
    get: () => window.history,
  },
  location: {
    configurable: true,
    get: () => window.location,
  },
});

const collectTemplates = (dir: string) => {
  const templates: Record<string, string> = {};

  const walk = (current: string) => {
    const entries = readdirSync(current, { withFileTypes: true });

    entries.forEach((entry) => {
      const fullPath = join(current, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.hbs')) {
        templates[fullPath] = readFileSync(fullPath, 'utf8');
      }
    });
  };

  walk(dir);

  return templates;
};

const componentTemplates = collectTemplates(resolve(__dirname, '../src/components'));
const pageTemplates = collectTemplates(resolve(__dirname, '../src/pages'));

const mockStoreState = (stateOrFactory: IStore | (() => IStore)) => {
  const originalGetState = store.getState.bind(store);
  const provider: () => IStore =
    typeof stateOrFactory === 'function'
      ? () => cloneStoreState((stateOrFactory as () => IStore)())
      : () => cloneStoreState(stateOrFactory);

  store.getState = provider;

  return () => {
    store.getState = originalGetState;
  };
};

TemplateEngine.init(componentTemplates, pageTemplates);

export { cloneStoreState, mockStoreState, startingStateForTest, unauthorizedStateForTest };
