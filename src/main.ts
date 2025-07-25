import { registerPartial } from "handlebars";
import "./style.css";

import { renderComponent } from "./utils/renderComponent.ts";
import registerPartials from "./utils/registerPartials.ts";

const app = document.querySelector("#app")!;

const styles = import.meta.glob("./templates/**/**/*.scss", {
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
  noChat: false,
  hasChat: true,

  name: "Андрей",

  fields: [
    { label: "Почта", value: "andrey@mail.ru" },
    { label: "Телефон", value: "+7 (912) 123‑45‑67" },
  ],

  chats: [
    {
      name: "Екатерина",
      time: "10:49",
      message: "Изображение",
      unreadCount: 2,
    },
    { name: "Илья", time: "09:30", message: "Привет!", unreadCount: 1 },
    { name: "Сергей", time: "09:20", message: "Ок", unreadCount: 0 },
  ],

  messages: [
    { text: "Привет!", time: "10:46" },
    { isOwn: true, text: "Как дела?", time: "10:47" },
    { image: "/img/photo.png", time: "10:48" },
  ],
};

registerPartials(templates);

renderComponent("main", pages, mainPageData, styles).then((html) => {
  app.innerHTML = html;
});
