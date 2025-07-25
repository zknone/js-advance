import "./style.css";

import { renderComponent } from "./utils/renderComponent.ts";

const app = document.querySelector("#app")!;

import.meta.glob("./templates/components/**/*.module.scss", { eager: true });
const templatePathes = import.meta.glob("./templates/components/**/**/*.hbs", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const templates = import.meta.glob("./templates/components/**/**/*.hbs?raw", {
  eager: true,
  import: "default",
}) as Record<string, string>;

console.log("templatesPathes", templatePathes);
console.log("templates", templates);
console.log(Object.keys(templates));

const chatItemData = {
  name: "Андрей",
  time: "10:49",
  message: "Изображение",
  unreadCount: 2,
};

renderComponent("chatItem", templates, chatItemData).then((html) => {
  app.innerHTML = html;
});
