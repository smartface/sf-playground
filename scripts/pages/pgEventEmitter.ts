import PgEventEmitterDesign from 'generated/pages/pgEventEmitter';

export default class PgEventEmitter extends PgEventEmitterDesign {
    testEmitter: () => void;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.testEmitter = this.layout.on('test', () => {
            console.info('test');
            this.testEmitter();
        });
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgEventEmitter, superOnShow: () => void) {
    superOnShow();
    setTimeout(() => {
        this.layout.emit('test');
        this.testEmitter();
        this.layout.emit('test');
    }, 1000);

    setTimeout(() => {
        this.layout.emit('test');
    }, 2000);
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
}
