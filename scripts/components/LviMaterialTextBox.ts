import LviMaterialTextBoxDesign from 'generated/my-components/LviMaterialTextBox';
import { themeService } from 'theme';

export default class LviMaterialTextBox extends LviMaterialTextBoxDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
  static getHeight() {
    return themeService.getStyle('.lviMaterialTextBox').height || 60;
  }
}
