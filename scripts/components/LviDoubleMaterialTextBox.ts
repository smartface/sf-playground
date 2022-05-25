import LviDoubleMaterialTextBoxDesign from 'generated/my-components/LviDoubleMaterialTextBox';
import { themeService } from 'theme';

export default class LviDoubleMaterialTextBox extends LviDoubleMaterialTextBoxDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    super(props);
    this.pageName = pageName;
  }
  get leftMaterialTextBox() {
    return this.mtb1;
  }
  get rightMaterialTextBox() {
    return this.mtb2;
  }
  static getHeight() {
    return themeService.getStyle('.lviDoubleMaterialTextBox').height || 60;
  }
}
