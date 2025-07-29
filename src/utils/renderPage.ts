import { renderComponent } from "./renderComponent";

export async function renderPage(
  pageName: string,
  pages: Record<string, string>,
  data: Record<string, any>
) {
  const html = await renderComponent(pageName, pages, data);

  const app = document.querySelector("#app")!;

  app.innerHTML = html;
}
