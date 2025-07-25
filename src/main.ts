import { registerPartial } from "handlebars";
import "./style.css";

import { renderComponent } from "./utils/renderComponent.ts";
import registerPartials from "./utils/registerPartials.ts";

const app = document.querySelector("#app")!;

const styles = import.meta.glob("./templates/components/**/*.scss", {
  eager: true,
}) as Record<string, string>;

const templates = import.meta.glob("./templates/components/**/*.hbs", {
  as: "raw",
  eager: true,
}) as Record<string, string>;

const pages = import.meta.glob("./templates/pages/**/*.hbs", {
  as: "raw",
  eager: true,
}) as Record<string, string>;

console.log({ pages });

const mainPageData = {
  name: "Андрей",
  time: "10:49",
  message: "Изображение",
  unreadCount: 2,
};

registerPartials(templates);

renderComponent("main", pages, mainPageData, styles).then((html) => {
  app.innerHTML = html;
});
