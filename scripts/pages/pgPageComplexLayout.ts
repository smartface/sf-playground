import PgPageComplexLayoutDesign from 'generated/pages/pgPageComplexLayout';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import ComplexListViewItem from 'components/ComplexListViewItem';
import GridView from '@smartface/native/ui/gridview';
import GridViewItem1 from 'components/GridViewItem1';
import Color from '@smartface/native/ui/color';

export default class PgPageComplexLayout extends withDismissAndBackButton(PgPageComplexLayoutDesign) {
    constructor(private router?: Router, private route?: Route) {
        super({});
    }

    /**
     * @event onShow
     * This event is called when the page appears on the screen (everytime).
     */
    onShow() {
        super.onShow();
        this.initBackButton(this.router); //Addes a back button to the page headerbar.
    }

    refreshListView() {

        this.listView1.itemCount = 3;
        this.listView1.refreshData();
    }

    initGridViewEvents(gvMain: GridView) {
        // We might want to test this with eventemitter as well.
        gvMain.layoutManager.onItemLength = () => 100;

        // We might want to test this with eventemitter as well.
        gvMain.onItemType = (index) => {
            if (index === 0) {
                return 1;
            } else if (index === 1) {
                return 2;
            }
            return 3;
        };

        // We might want to test this with eventemitter as well.
        gvMain.onItemBind = (gridViewItem: GridViewItem1, index) => {
            gridViewItem.title = 'title';
            gridViewItem.label1.backgroundColor = Color.RED;

            setTimeout(() => {

                gridViewItem.label1.dispatch({
                    'type': 'updateUserStyle', userStyle: {
                        height: 100
                    }
                })
            }, 2000);
        };
    }

    initGridView(gvMain: GridView) {
        gvMain.refreshEnabled = true;
        gvMain.backgroundColor = Color.TRANSPARENT;
        gvMain.itemCount = 3;
        gvMain.scrollBarEnabled = false;
        this.initGridViewEvents(gvMain);

        // setTimeout(() => {
        //     gvMain.layoutManager.nativeObject.invalidateLayout()
        // }, 4000);
    }

    initListView() {
        this.listView1.refreshEnabled = false;
        this.listView1.onRowHeight = (index) => {
            return 250
        };

        this.listView1.onRowBind = (listViewItem: ComplexListViewItem, index) => {
            this.initGridView(listViewItem.gridView1)
        };


    }

    onLoad() {
        super.onLoad();

        this.initListView()
        this.refreshListView()




    }
}
