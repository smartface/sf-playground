import Page from "sf-core/ui/page";
import View from "sf-core/ui/view";
import NavigationController from "sf-core/ui/navigationcontroller";

type ViewType = View | NavigationController;

export abstract class PageBase extends Page {
    private children: Map<string, ViewType>;
    constructor(param:any){
        super(param);
        this.children = new Map();
    }

    protected addChild(name: string, ChildClass: ObjectConstructor, ...params:any[]){
	    let child = new ChildClass(...params);
        this.children.set(name, child);
        this.layout && this.layout.addChild(child);
        // else this.addChild && this.addChild(child);
        child = null;
    }
}