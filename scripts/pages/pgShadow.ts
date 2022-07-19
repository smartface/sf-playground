import PgShadowDesign from 'generated/pages/pgShadow';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import GviShadow from 'components/GviShadow';
import Color from '@smartface/native/ui/color';
import Screen from '@smartface/native/device/screen';


const SPAN_COUNT: number = 3;
type DatasetType = { title: string; offset: { x: number, y: number }, color: Color, shadowRadius: number };

export default class PgShadow extends withDismissAndBackButton(PgShadowDesign) {
    index: number = 0;
    testDataset = [
        { title: "#1", offSet: { x: 0, y: 8 }, color: Color.create(0.2, 149, 157, 165), shadowRadius: 24 },
        { title: "#2", offSet: { x: 0, y: 7 }, color: Color.create(0.2, 100, 100, 111), shadowRadius: 29 },
        { title: "#3", offSet: { x: 0, y: 5 }, color: Color.create(0.35, 0, 0, 0), shadowRadius: 15 },
        { title: "#4", offSet: { x: 0, y: 1 }, color: Color.create(0.16, 0, 0, 0), shadowRadius: 4 },
        { title: "#5", offSet: { x: 0, y: 3 }, color: Color.create(0.24, 0, 0, 0), shadowRadius: 8 },
        { title: "#6", offSet: { x: 0, y: 2 }, color: Color.create(0.2, 99, 99, 99), shadowRadius: 8 },
        { title: "#7", offSet: { x: 0, y: 2 }, color: Color.create(0.2, 99, 99, 99), shadowRadius: 8 }, // There are 2 box-shadows on the example page.
        { title: "#8", offSet: { x: 0, y: 2 }, color: Color.create(0.2, 99, 99, 99), shadowRadius: 8 }, // There are 2 box-shadows on the example page.
        { title: "#9", offSet: { x: 0, y: 2 }, color: Color.create(0.1, 0, 0, 0), shadowRadius: 8 },


    ]
    constructor(private router?: Router, private route?: Route) {
        super({});
    }
    initGridViewEvents() {

        this.gvMain.layoutManager.onItemLength = () => Screen.width / SPAN_COUNT;

        this.gvMain.onItemBind = (gridViewItem: GviShadow, index) => {
            let { title, offSet, color, shadowRadius } = this.testDataset[index];
            gridViewItem.flLabel.text = title;
            gridViewItem.flShadow.ios.shadowColor = color
            gridViewItem.flShadow.ios.shadowOffset = offSet
            gridViewItem.flShadow.ios.shadowRadius = shadowRadius;
            gridViewItem.flShadow.ios.shadowOpacity = 100;
            gridViewItem.flShadow.backgroundColor = Color.WHITE;
        };
        this.gvMain.on('itemSelected', (gridViewItem: GviShadow, index) => {
            console.log(`Item title : ${gridViewItem.flLabel.text}`);
        });
        this.gvMain.on('pullRefresh', () => {
            console.log('Gridview onPullRefresh');
        });
        this.gvMain.on('scroll', () => {
            console.log('Gridview onScroll');
        });
        this.gvMain.on('itemLongSelected', () => {
            console.log('Gridview itemLongSelected');
        });
        this.gvMain.on('attachedToWindow', () => {
            console.log('Gridview attachedToWindow');
        });
        this.gvMain.on('detachedFromWindow', () => {
            console.log('Gridview detachedFromWindow');
        });
        // this.gvMain.on("gesture", () => {
        //     console.log('Gridview gesture'); // This needs to be tested as well
        // })
        this.gvMain.on('scrollBeginDecelerating', () => {
            console.log('Gridview scrollBeginDecelerating');
        });
        this.gvMain.on('scrollBeginDragging', () => {
            console.log('Gridview scrollBeginDragging');
        });
        this.gvMain.on('scrollEndDecelerating', () => {
            console.log('Gridview scrollEndDecelerating');
        });
        this.gvMain.on('scrollEndDraggingWillDecelerate', () => {
            console.log('Gridview scrollEndDraggingWillDecelerate');
        });
        this.gvMain.on('scrollEndDraggingWithVelocityTargetContentOffset', () => {
            console.log('Gridview scrollEndDraggingWithVelocityTargetContentOffset');
        });
        this.gvMain.on('scrollStateChanged', () => {
            console.log('Gridview scrollStateChanged');
        });
    }

    initGridView() {
        this.gvMain.refreshEnabled = true;
        this.gvMain.itemCount = this.testDataset.length;
        this.gvMain.scrollBarEnabled = false;
        this.initGridViewEvents();
    }
    onShow() {
        super.onShow();
        this.initBackButton(this.router); //Addes a back button to the page headerbar.
        this.layout.backgroundColor = Color.create(245, 245, 245);
    }


    onLoad() {
        super.onLoad();
        this.initGridView();

    }
}
