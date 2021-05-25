const OS = require('sf-core/device/system').OS;
const buildExtender = require("sf-extension-utils/lib/router/buildExtender");
const {
    NativeRouter: Router,
    NativeStackRouter: StackRouter,
    Route
} = require("@smartface/router");
require("sf-extension-utils/lib/router/goBack"); // Implements onBackButtonPressed
const router = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/pages",
            routes: [
                Route.of({
                    path: "/pages/page1",
                    build: buildExtender({ getPageClass: () => require("pages/page1").default, headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/nativeswitch",
                    build: buildExtender({ getPageClass: () => require("pages/pgNativeSwitch").default, headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/page2",
                    build: buildExtender({ getPageClass: () => require("pages/page2").default, headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/hideshow",
                    build: buildExtender({ getPageClass: () => require("pages/pageHideShow").default })
                }),
                Route.of({
                    path: "/pages/chart",
                    build: buildExtender({ getPageClass: () => require("pages/pgChart").default })
                }),
                Route.of({
                    path: "/pages/login",
                    build: buildExtender({ getPageClass: () => require("pages/pgLogin").default })
                }),
                Route.of({
                    path: "/pages/buttonpress",
                    build: buildExtender({ getPageClass: () => require("pages/pgButtonPress").default })
                }),
                Route.of({
                    path: "/pages/websocket",
                    build: buildExtender({ getPageClass: () => require("pages/pgWebSocket").default })
                }),
                Route.of({
                    path: "/pages/badgeanimation",
                    build: buildExtender({ getPageClass: () => require("pages/pgBadgeAnimation").default })
                }),
                Route.of({
                    path: "/pages/headersearch",
                    build: buildExtender({ getPageClass: () => require("pages/pgHeaderSearch").default, headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/pages/notouch",
                    build: buildExtender({ getPageClass: () => require("pages/pgNoTouch").default, headerBarStyle: { visible: true } })
                }),
            ]
        })
    ]
});

export = router;
