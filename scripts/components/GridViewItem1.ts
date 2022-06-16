import GridViewItem1Design from 'generated/my-components/GridViewItem1';

export default class GridViewItem1 extends GridViewItem1Design {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }

    set title(value: string) {
        this.label1.text = value
    }
}
