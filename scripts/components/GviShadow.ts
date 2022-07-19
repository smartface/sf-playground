import GviShadowDesign from 'generated/my-components/GviShadow';

export default class GviShadow extends GviShadowDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
}
