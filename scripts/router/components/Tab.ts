import $$Tab from 'generated/router/components/Tab';
import * as Tabs from 'routes/tabs';
import MainPage from 'pages/mainPage';
import Route from '@smartface/router/lib/router/Route';
import { innerPages } from 'routes/innerPages';
export default class Tab extends $$Tab {
    constructor(basePath: string, name: string, index: number) {
        super(basePath);
        this.mainRoute.build = (router, route) => {
            const mainPage = new MainPage(router, route);
            mainPage.pages = Tabs[name].pages;
            return mainPage;
        }
        Tabs[name].pages.map((page) => {
            this._routes.unshift(this.generateRoute(basePath, page))
        });
        innerPages.map((page)=> {
            this._routes.unshift(this.generateRoute(basePath,page))})
    }
    generateRoute(basePath, page) {
        const pageName = page.name;
        return Route.of({
            path: `${basePath}/${pageName}`,
            build: (router, route) => new page(router, route)
        });
    }
}