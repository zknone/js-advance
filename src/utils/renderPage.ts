import { renderComponent } from './renderComponent';

export async function renderPage<T>(
  pageName: string,
  pages: Record<string, string>,
  data: Record<string, T>
) {
  const html = await renderComponent(pageName, pages, data);

  const app = document.querySelector('#app')!;

  app.innerHTML = html;
}
