import { NativeRouter as Router, NativeStackRouter as StackRouter, Route, BottomTabBarRouter } from '@smartface/router';
import Image from '@smartface/native/ui/image';
import Page from '@smartface/native/ui/page';
import MainPage from 'pages/mainPage';
import PgModalTest from 'pages/pgModalTest';
import * as Tabs from 'routes/tabs';
import { ConstructorOf } from '@smartface/styling-context/lib/ConstructorOf';
import Application from '@smartface/native/application';
import PgPhotoCropper from 'pages/pgPhotoCropper';
import { innerPages } from './innerPages';
import PgModalBottomSheet from 'pages/pgModalBottomSheet';
import Color from '@smartface/native/ui/color';
import BottomTabbarController from '@smartface/native/ui/bottomtabbarcontroller';
import { ITabbarItem } from '@smartface/native/ui/tabbaritem/tabbaritem';
import AttributedString from '@smartface/native/ui/attributedstring';
import Font from '@smartface/native/ui/font';

Application.on('backButtonPressed', () => {
  Router.getActiveRouter()?.goBack();
});

const ROOT_PATH = '/root';
const TAB_PREFIX = 'tab';

function generateRoute(basePath: string, page: ConstructorOf<Page>) {
  const pageName = page.name;
  return Route.of({
    path: `${basePath}/${pageName}`,
    build: (router, route) => new page(router, route)
  });
}

function generateTabRoute(basePath: string, tab: typeof Tabs['tab0']) {
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
        }
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
          })
        ]
      }),
      StackRouter.of({
        path: `${path}/modal`,
        to: `${path}/modal/page`,
        modal: true,
        routes: [
          Route.of({
            path: `${path}/modal/page`,
            build: (router, route) => new PgModalTest(router, route)
          })
        ]
      }),
      StackRouter.of({
        path: `${path}/bottomSheet`,
        to: `${path}/bottomSheet/page`,
        modal: true,
        modalType: 'bottom-sheet',
        bottomSheetOptions: {
          cornerRadius: 20,
          detents: ['large', 'medium'],
          isGrabberVisible: true
        },
        routes: [
          Route.of({
            path: `${path}/bottomSheet/page`,
            build: (router, route) => new PgModalBottomSheet(router, route)
          })
        ]
      }),
      ...innerPages.map((page) => generateRoute(basePath, page))
    ]
  });
}

// const attributeString = new AttributedString();
// attributeString.string = ' Third - AttributedString';
// attributeString.link = 'https://www.google.com/';
// attributeString.strikethrough = true;
// attributeString.backgroundColor = Color.RED;
// attributeString.foregroundColor = Color.GREEN;
// attributeString.underline = true;
// attributeString.font = Font.create('Times New Roman', 30, Font.NORMAL);
// attributeString.ios.underlineColor = Color.BLUE;
// attributeString.ios.strikethroughColor = Color.WHITE;

function generateTabItems(): Partial<ITabbarItem>[] {
  return Object.keys(Tabs).map((tab: any) => {
    return {
      title: Tabs[tab].name,
      icon: Image.createFromFile(`images://${Tabs[tab].imageName.toLowerCase()}`)
      //   android: {
      //     attributedTitle: attributeString,
      //     systemIcon: 17301545
      //   }
    } as Partial<ITabbarItem>;
  });
}

const bottomTabBarRouter = BottomTabBarRouter.of({
  path: `${ROOT_PATH}/btb`,
  items: generateTabItems(),
  onTabChangedByUser: () => {},
  // tabbarParams: () => ({
  //   itemColor: { normal: Color.GRAY, selected: Color.BLUE },
  //   backgroundColor: Color.YELLOW,
  //   ios: {
  //     translucent: true
  //   }
  // }),
  routes: Object.keys(Tabs).map((tab: any) => generateTabRoute(`${ROOT_PATH}/btb`, Tabs[tab]))
});

//BottomTabbarControllerTesting
// setTimeout(() => {
//   const rootController = bottomTabBarRouter._renderer._rootController;
//   if (rootController instanceof BottomTabbarController) {
//     rootController.didSelectByIndex = ({ index }) => {
//       console.info('didSelectByIndex', index);
//       setTimeout(() => {
//         rootController.selectedIndex = 2;
//       }, 5000);
//     };
// rootController.shouldSelectByIndex = ({ index }) => {
//   console.info('shouldSelectByIndex', index);
//   return index === 3;
// };
//   rootController.tabBar.backgroundColor = Color.BLUE;
//   rootController.tabBar.itemColor = { selected: Color.WHITE, normal: Color.BLACK };
// setTimeout(() => {
//   rootController.selectedIndex = 2;
// }, 3000);
//   }
// }, 5000);

//BottomTabbarBadgeTesting
// setTimeout(() => {
//   const rootController = bottomTabBarRouter._renderer._rootController;
//   rootController.tabBar.items[0].badge.text = '5';
// }, 5000);

const router = Router.of({
  path: '/',
  to: ROOT_PATH,
  isRoot: true,
  routes: [bottomTabBarRouter]
});

let listenerCounter = 0;
router.listen((location, action) => {
  console.log(`[ROUTER] Counter: ${listenerCounter++} | location url: ${location.url}`);
});

export default router;
