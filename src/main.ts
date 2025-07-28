import "./style.css";
import registerPartials from "./utils/registerPartials.ts";
import { renderPage } from "./utils/renderPage.ts";

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
    {
      name: "Екатерина",
      time: "10:49",
      message: "Изображение",
      unreadCount: 2,
    },
    { name: "Илья", time: "09:30", message: "Привет!", unreadCount: 1 },
    { name: "Сергей", time: "09:20", message: "Ок", unreadCount: 0 },
    {
      name: "Екатерина",
      time: "10:49",
      message: "Изображение",
      unreadCount: 2,
    },
    { name: "Илья", time: "09:30", message: "Привет!", unreadCount: 1 },
    { name: "Сергей", time: "09:20", message: "Ок", unreadCount: 0 },
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
    { image: "public/image.png", time: "10:48" },
  ],
};

const profilePageData = {
  name: "Андрей",
  fields: [
    { label: "Почта", value: "andrey@mail.ru" },
    { label: "Телефон", value: "+7 (912) 123‑45‑67" },
  ],
};

const loginPageData = {
  fields: [
    {
      title: "Login",
      name: "login",
      type: "text",
      placeholder: "Enter login",
    },
    {
      title: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter password",
    },
  ],
};

const routes: Record<string, () => void> = {
  main: () => renderPage("mainPage", pages, mainPageData, styles),
  profile: () => renderPage("profilePage", pages, profilePageData, styles),
  login: () => renderPage("loginPage", pages, loginPageData, styles),
};

registerPartials(templates);

function getPage() {
  const pathRoute = location.pathname.replace("/", "");

  return routes[pathRoute] || routes["main"];
}

window.addEventListener("hashchange", () => {
  getPage()();
});

getPage()();
