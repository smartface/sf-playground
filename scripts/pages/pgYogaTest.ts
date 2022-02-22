import PgYogaTestDesign from 'generated/pages/pgYogaTest';
import FlexLayout from '@smartface/native/ui/flexlayout';
import Screen from '@smartface/native/device/screen';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import System from '@smartface/native/device/system';
import View from '@smartface/native/ui/view';

const { paddingLeft, paddingRight, paddingTop, paddingBottom } = getCombinedStyle('.sf-page');

const MAX_WIDTH = Screen.width - (paddingLeft + paddingRight);
const MIN_WIDTH = MAX_WIDTH / 2;
const MAX_HEIGHT = (Screen.height - (paddingTop + paddingBottom)) / 4;
const MIN_HEIGHT = MAX_HEIGHT / 2;
const MAX_ITEM_LENGTH = 150;
const MAX_DURATION = 5_000;
const MIN_DURATION = 1_000;

export default class PgYogaTest extends PgYogaTestDesign {
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    init() {
        for (let i = 0; i < MAX_ITEM_LENGTH; i++) {
            const parentFlex = new FlexLayout();
            // @ts-ignore
            this.svMain.layout.addChild(parentFlex, `parent${i}`, '.sf-flexLayout #pgYogaTest-parent');
            // @ts-ignore
            parentFlex.dispatch({
                type: 'updateUserStyle',
                userStyle: {
                    width: this.getRandomWidth(),
                    height: this.getRandomHeight()
                }
            });

            const childFlex = new FlexLayout();
            // @ts-ignore
            parentFlex.addChild(childFlex, `child${i}`, '.sf-flexLayout #pgYogaTest-child');
            // @ts-ignore
            childFlex.dispatch({
                type: 'updateUserStyle',
                userStyle: {
                    width: this.getRandomWidth(),
                    height: this.getRandomHeight()
                }
            });

            System.OS === System.OSType.IOS
                ? this.svMain.layout.applyLayout()
                : this.applyLayoutToItems([parentFlex, childFlex]);

            setInterval(() => {
                // @ts-ignore
                parentFlex.dispatch({
                    type: 'updateUserStyle',
                    userStyle: {
                        width: this.getRandomWidth(),
                        height: this.getRandomHeight()
                    }
                });
                // @ts-ignore
                childFlex.dispatch({
                    type: 'updateUserStyle',
                    userStyle: {
                        width: this.getRandomWidth() / 2,
                        height: this.getRandomHeight() / 2
                    }
                });

                System.OS === System.OSType.IOS
                    ? this.svMain.layout.applyLayout()
                    : this.applyLayoutToItems([parentFlex, childFlex]);
            }, this.getRandomDuration());
        }
        this.svMain.layout.applyLayout();
    }
    getRandomWidth = () => Math.floor(Math.random() * (MAX_WIDTH - MIN_WIDTH + 1) + MIN_WIDTH)
    getRandomHeight = () => Math.floor(Math.random() * (MAX_HEIGHT - MIN_HEIGHT + 1) + MIN_HEIGHT)
    getRandomDuration = () => Math.floor(Math.random() * (MAX_DURATION - MIN_DURATION + 1) + MIN_DURATION)
    applyLayoutToItems(views: View[]) {
        for (let view of views) {
            view.applyLayout();
        }
    }
}

function onShow(superOnShow: () => void) {
    superOnShow();
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.init();
}
