import PgLabelListViewDesign from 'generated/pages/pgLabelListView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import LviTitle from 'components/LviTitle';
import Color from '@smartface/native/ui/color';

export default class PgLabelListView extends withDismissAndBackButton(PgLabelListViewDesign) {
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

    /**
     * @event onLoad
     * This event is called once when the page is created.
     */

    refreshListView() {

        this.listView1.itemCount = 3;
        this.listView1.refreshData();
    }

    initListView() {
        this.listView1.refreshEnabled = false;
        this.listView1.onRowHeight = (index) => {
            return 250
        };

        this.listView1.onRowBind = (listViewItem: LviTitle, index) => {
            console.log('listViewItem.nativeObject.toString():',listViewItem.nativeObject.toString());
            
            listViewItem.lblTitle.text = 'LABEL'

            setTimeout(() => {
                listViewItem.lblTitle.dispatch({
                    type: 'updateUserStyle', userStyle: {
                        // width: 100,
                        height: 100,
                        // backgroundColor: '#000000'
                    }
                })

                // this.listView1.dispatch({type:'updateUserStyle', userStyle: {
                //     backgroundColor: '#fcba03'
                // }})

                // listViewItem.applyLayout()
                this.layout.applyLayout()

                // listViewItem.applyLayout()
                // this.listView1.refreshData();

                // console.log('listViewItem.nativeObject.yoga.isDirty():' ,listViewItem.nativeObject.yoga.isDirty);
                // console.log('label.nativeObject.yoga.isDirty():' ,listViewItem.lblTitle.nativeObject.yoga.isDirty);

                // listViewItem.lblTitle.applyLayout()
                // listViewItem.lblTitle.nativeObject.yoga.isDirty = false
                
                // console.log('AFTER:::\n\n');
                // setTimeout(() => {
                //     console.log('listViewItem.nativeObject.yoga.isDirty():' ,listViewItem.nativeObject.yoga.isDirty);
                //     console.log('label.nativeObject.yoga.isDirty():' ,listViewItem.lblTitle.nativeObject.yoga.isDirty);
                    
                // }, 2000);

                // listViewItem.nativeObject.layoutIfNeeded()
                // listViewItem.lblTitle.nativeObject.layoutIfNeeded()

                // this.layout.nativeObject.layoutIfNeeded()

            }, 2000);
            // listViewItem.applyLayout()
        };


    }

    onLoad() {
        super.onLoad();

        this.initListView()
        this.refreshListView()



        // setTimeout(() => {
        //     this.flexLayout1.dispatch({ type: 'updateUserStyle', userStyle: { flexGrow: 0.8 } })
        //     this.listView1.dispatch({ type: 'updateUserStyle', userStyle: { flexGrow: 1 } })

        //     this.nativeObject.checkSubViews()
        // }, 1500);

        // console.log('dss');
        

        // setTimeout(() => {
        //     this.nativeObject.checkSubViews()
        // }, 2500);

        // setTimeout(() => {
        //     this.layout.applyLayout()
        // }, 2000);
    }
}
