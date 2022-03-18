import { NativeRouter as Router, NativeStackRouter as StackRouter, Route, BottomTabBarRouter } from "@smartface/router";
import Image from "@smartface/native/ui/image";
import Page from "@smartface/native/ui/page";
import MainPage from "pages/mainPage";
import PgModalTest from "pages/pgModalTest";
import * as Tabs from "routes/tabs";
import { ConstructorOf } from "@smartface/styling-context/lib/ConstructorOf";
import Application from "@smartface/native/application";
import PgPhotoCropper from "pages/pgPhotoCropper";
import { innerPages } from "./innerPages";

Application.on("backButtonPressed", () => {
  Router.getActiveRouter()?.goBack();
});

const ROOT_PATH = "/root";
const TAB_PREFIX = "tab";

function generateInnerPageRoutes(basePath: string, pages: ConstructorOf<Page>[]) {
  return pages.map((page) => {
    return Route.of({
      path: `${basePath}/${page.name}`,
      build: (router, route) => new page(router, route),
    });
  });
}

function generateRoute(basePath: string, page: ConstructorOf<Page>) {
  const pageName = page.name;

  return Route.of({
    path: `${basePath}/${pageName}`,
    build: (router, route) => new page(router, route),
  });
}

function generateTabRoute(basePath: string, tab: typeof Tabs["tab0"]) {
  const path = `${basePath}/${TAB_PREFIX}${tab.tabIndex}`;
  const tabItems = tab.pages.map((page) => generateRoute(path, page));
  return StackRouter.of({
    path,
    to: `${path}/mainpage`,
    routes: [
      Route.of({
        path: `${path}/mainpage`,
        build: (router, route) => {
          const mainPage = new MainPage(router, route);
          mainPage.pages = tab.pages;
          return mainPage;
        },
      }),
      ...tabItems,
      StackRouter.of({
        path: `${path}/PgPhotoCropper`,
        to: `${path}/PgPhotoCropper/main`,
        modal: true,
        routes: [
          Route.of({
            path: `${path}/PgPhotoCropper/main`,
            build: (router, route) => new PgPhotoCropper(router, route)
          }),
        ],
      }),
      StackRouter.of({
        path: `${path}/modal`,
        to: `${path}/modal/page`,
        modal: true,
        routes: [
          Route.of({
            path: `${path}/modal/page`,
            build: (router, route) => new PgModalTest(router, route),
          }),
        ],
      }),
      ...generateInnerPageRoutes(path, innerPages)
    ],
  });
}

function generateTabItems() {
  return Object.keys(Tabs).map((tab: any) => ({ title: Tabs[tab].name, icon: Image.createFromFile("images://arrowbottom.png") }));
}

const bottomTabBarRouter = BottomTabBarRouter.of({
  path: `${ROOT_PATH}/btb`,
  items: generateTabItems(),
  onTabChangedByUser: () => {},
  routes: Object.keys(Tabs).map((tab: any) => generateTabRoute(`${ROOT_PATH}/btb`, Tabs[tab])),
});

const router = Router.of({
  path: "/",
  to: ROOT_PATH,
  isRoot: true,
  routes: [
    bottomTabBarRouter
  ],
});

let listenerCounter = 0;
router.listen((location, action) => {
  console.log(`[ROUTER] Counter: ${listenerCounter++} | location url: ${location.url}`);
});

export default router;
