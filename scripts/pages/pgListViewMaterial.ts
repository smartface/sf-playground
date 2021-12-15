import PgListViewMaterialDesign from 'generated/pages/pgListViewMaterial';
import FlMaterialTextBox from '@smartface/component-materialtextbox';
import MaterialTextBox from '@smartface/native/ui/materialtextbox';
import LviMaterialTextBox from 'components/LviMaterialTextBox';
import Label from '@smartface/native/ui/label';

export default class PgListViewMaterial extends PgListViewMaterialDesign {
    data: ReturnType<PgListViewMaterial['generateMaterialWrapper']>[] = Array.from(Array(30), () => this.generateMaterialWrapper());
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
	}

    private generateMaterialWrapper(): Partial<FlMaterialTextBox> {
        return {
            options: this.generateMaterialData()
        }
    }

    private generateMaterialData(): FlMaterialTextBox['options'] {
        return {
            hint: "test",
            text: "asdf"
        }
    }

    initListView() {
        this.lvMain.refreshEnabled = false;
        this.lvMain.rowHeight = LviMaterialTextBox.getHeight();
        this.lvMain.onRowBind = (item: LviMaterialTextBox, index: number) => {
            const currentData = this.data[index];
            item.materialTextBox.options = currentData.options;
            item.materialTextBox.clearAllEnabled = index > 15;
            item.applyLayout();
        }
    }

    refreshListView() {
        this.lvMain.itemCount = this.data.length;
        this.lvMain.refreshData();
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgListViewMaterial, superOnShow: () => void) {
	superOnShow();
    this.refreshListView();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgListViewMaterial, superOnLoad: () => void) {
	superOnLoad();
    this.initListView();
}
