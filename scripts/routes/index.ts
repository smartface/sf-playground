import buildExtender from "@smartface/extension-utils/lib/router/buildExtender";
import { NativeRouter as Router, NativeStackRouter as StackRouter, Route, BottomTabBarRouter } from "@smartface/router";
import "@smartface/extension-utils/lib/router/goBack"; // Implements onBackButtonPressed
import backClose from "@smartface/extension-utils/lib/router/back-close";
import Image from "@smartface/native/ui/image";
import Page from "@smartface/native/ui/page";
import MainPage from "pages/mainPage";
import PgModalTest from "pages/pgModalTest";
import * as Tabs from "routes/tabs";

const ROOT_PATH = "/root";
const TAB_PREFIX = "tab";

backClose.setDefaultBackStyle({
  image: Image.createFromFile("images://backarrow.png"),
  hideTitle: false,
});

backClose.dismissBuilder = () => {
  return {
    image: Image.createFromFile("images://backarrow.png"),
    position: backClose.DismissPosition.LEFT,
  };
};

function generatePageRoutes(basePath: string, pages: Page[]) {
  return Object.keys(pages).map((pageName) => {
    return Route.of({
      path: `${basePath}/${pageName}`,
      build: buildExtender({ getPageClass: () => pages[pageName], headerBarStyle: { visible: true }, pageName }),
    });
  });
}

function generateRoute(basePath: string, page: { new (params: any): Page }) {
  const pageName = page.name;
  return Route.of({
    path: `${basePath}/${pageName}`,
    build: (router, route) => page,
  });
}
// buildExtender({
//     getPageClass: () => MainPage,
//     headerBarStyle: { visible: true },
//     pageName: "mainpage",
//     pageProps: {
//       pages: tab.pages,
//     },
//   }),

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
        path: `${path}/modal`,
        to: `${path}/modal/page`,
        modal: true,
        routes: [
          Route.of({
            path: `${path}/modal/page`,
            build: () => new PgModalTest(),
          }),
        ],
      }),
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
    StackRouter.of({
      path: ROOT_PATH,
      routes: [bottomTabBarRouter],
    }),
  ],
});

let listenerCounter = 0;
router.listen((location, action) => {
  console.log(`[ROUTER] Counter: ${listenerCounter++} | location url: ${location.url}`);
});

export default router;
