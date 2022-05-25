import LviMaterialTextBoxDesign from 'generated/my-components/LviMaterialTextBox';
import { themeService } from 'theme';

export default class LviMaterialTextBox extends LviMaterialTextBoxDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    super(props);
    this.pageName = pageName;
  }
  get materialTextBox() {
    return this.mtb;
  }
  static getHeight() {
    return themeService.getStyle('.lviMaterialTextBox').height || 60;
  }
}
