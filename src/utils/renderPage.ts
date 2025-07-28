import { renderComponent } from "./renderComponent";

export async function renderPage(
  pageName: string,
  pages: Record<string, string>,
  data: Record<string, any>,
  styles: Record<string, string>
) {
  const html = await renderComponent(pageName, pages, data, styles);

  const app = document.querySelector("#app")!;

  app.innerHTML = html;
}
