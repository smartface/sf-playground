import PgBorderRadiusDesign from 'generated/pages/pgBorderRadius';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';

export default class PgBorderRadius extends withDismissAndBackButton(PgBorderRadiusDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.swTopLeft.on('toggleChanged',(isChecked)=>{
        isChecked ? this.btnMain.borderTopLeftRadius = 20 : this.btnMain.borderTopLeftRadius = 0
    })
    this.swTopRight.on('toggleChanged',(isChecked)=>{
        isChecked ? this.btnMain.borderTopRightRadius = 20 : this.btnMain.borderTopRightRadius = 0
    })
    this.swBottomLeft.on('toggleChanged',(isChecked)=>{
        isChecked ? this.btnMain.borderBottomLeftRadius = 20 : this.btnMain.borderBottomLeftRadius = 0
    })
    this.swBottomRight.on('toggleChanged',(isChecked)=>{
        isChecked ? this.btnMain.borderBottomRightRadius = 20 : this.btnMain.borderBottomRightRadius = 0
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
