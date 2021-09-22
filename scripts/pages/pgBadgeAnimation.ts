import PgBadgeAnimationDesign from 'generated/pages/pgBadgeAnimation';
import System from '@smartface/native/device/system';
import Animator from '@smartface/native/ui/animator';
import LviBadge from 'components/LviBadge';
import FlImage from 'components/FlImage';
import ListViewIndex from '@smartface/extension-listviewindex';

export default class PgBadgeAnimation extends PgBadgeAnimationDesign {
    scrollData: string[] = [];
    listViewIndex = new ListViewIndex();
    constructor() {
        super();
        let firstLetter = 65;
        this.scrollData = Array(26).fill(firstLetter).map((number) => String.fromCharCode(firstLetter++));
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    initListView() {
        this.listViewIndex = new ListViewIndex();
        this.listViewIndex.width = 20;
        this.listViewIndex.items = this.scrollData;
        System.OS === System.OSType.IOS && this.listViewIndex.reloadData();
        this.listViewIndex.indexDidSelect = (index) => {
            this.myListView.scrollTo(0, false);
            return true; //haptic
        }
        this.layout.addChild(this.listViewIndex);
        this.myListView.onPullRefresh = () => {
            this.refreshListView();
            this.myListView.stopRefresh();
        }

        this.myListView.onRowSelected = (listViewItem: LviBadge, index: number) => {
            console.log("selected index = " + index)
            const visibleScale = { x: 1, y: 1 };
            const inVisibleScale = { x: 0, y: 0 };
            const animationTime = 150;
            const flexlayouts: FlImage[] = [listViewItem.flImage, listViewItem.flImage1, listViewItem.flImage2, listViewItem.flImage3, listViewItem.flImage4];
            flexlayouts.forEach((layout) => {
                layout.scale = inVisibleScale;
            });

            Animator.animate(flexlayouts[0].getParent(), animationTime, () => {
                flexlayouts[0].scale = visibleScale;
            })
                .then(animationTime, () => flexlayouts[1].scale = visibleScale)
                .then(animationTime, () => flexlayouts[2].scale = visibleScale)
                .then(animationTime, () => flexlayouts[3].scale = visibleScale)
                .then(animationTime, () => flexlayouts[4].scale = visibleScale)
                .complete(() => {
                    console.log(" Animation is over ");
                });
        }
    }

    refreshListView() {
        this.myListView.refreshData();
    }
}

function onShow(this: PgBadgeAnimation, superOnShow: () => void) {
    superOnShow();
}

function onLoad(this: PgBadgeAnimation, superOnLoad: () => void) {
    superOnLoad();
    this.initListView();
}