
import buildExtender from "@smartface/extension-utils/lib/router/buildExtender";
import {
    NativeRouter as Router,
    NativeStackRouter as StackRouter,
    Route
} from "@smartface/router";
import * as Pages from 'pages';
import "@smartface/extension-utils/lib/router/goBack"; // Implements onBackButtonPressed

function generatePageRoutes(basePath: string) {
    return Object.keys(Pages).map((pageName, index) => {
        return Route.of({
            path: `${basePath}/${pageName}`,
            build: buildExtender({ getPageClass: () => Pages[pageName], headerBarStyle: { visible: true } })
        })
    });
}

const router = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/pages",
            routes: generatePageRoutes("/pages")
        })
    ]
});

export default router;
