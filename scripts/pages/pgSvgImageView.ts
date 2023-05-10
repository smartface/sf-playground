import PgSvgImageViewDesign from 'generated/pages/pgSvgImageView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import File from '@smartface/native/io/file';
import Path from '@smartface/native/io/path';

export default class PgSvgImageView extends withDismissAndBackButton(PgSvgImageViewDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnLoadFromFile.on('press',()=>{
        this.svgImageViewMain.loadFromFile({
            file: new File({path:Path.AssetsUriScheme + 'car.svg'})
        })
    })
    this.btnLoadFromUrl.on('press',()=>{
        this.svgImageViewMain.loadFromUrl({
            url:'https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/cartman.svg'
        })
    })
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
  onLoad() {
    super.onLoad();
  }
}
