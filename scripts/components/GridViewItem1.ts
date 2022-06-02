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

        setTimeout(() => {
            this.label1.dispatch({
                'type': 'updateUserStyle', userStyle: {
                    height: 100,
                }
            })

            // this.label1.dirty()
            // this.dirty()
            // this.label1.nativeObject.setNeedsLayout()
            // this.nativeObject.setNeedsLayout()
            
            // this.parent.nativeObject.setNeedsLayout()

            // this.applyLayout()

            // this.label1.applyLayout()
            
            // this.label1.nativeObject.setNeedsLayout()
            // this.label1.nativeObject.setNeedsDisplay()
            // this.label1.nativeObject.layoutIfNeeded()

            // this.nativeObject.setNeedsLayout()
            // this.getParent().nativeObject.setNeedsLayout()
            // this.getParent().getParent().getParent().nativeObject.setNeedsLayout()
        }, 1500);
    }
}
