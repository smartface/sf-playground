import NavigationController from "sf-core/ui/navigationcontroller";
import Page from "sf-core/ui/page";
import { ComponentStyleContext } from "./component-style-context";
import View from "sf-core/ui/view";

type ViewType = View | NavigationController;

export abstract class StyledPage extends Page {
    private children: Map<string, ViewType>;
    static $$styleContext: ComponentStyleContext;
    constructor(params: any) {
        super(params);
        this.children = new Map();
        this.addChild('statusBar', this.statusBar);
        this.addChild('headerBar', this.headerBar);
        this.ios && (this.ios.safeAreaLayoutMode = true);
    }

    protected addChild(name: string, child: Object) {
        this.children.set(name, child);
        this.layout && this.layout.addChild(child);
        // else this.addChild && this.addChild(child);
        child = null;
    }
}