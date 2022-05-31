import LviTitleDesign from 'generated/my-components/LviTitle';
import { themeService } from 'theme';
const Height = themeService.getNativeStyle('.lviTitle').height;

export default class LviTitle extends LviTitleDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
  get title(): string {
    return this.lblTitle.text;
  }
  set title(value: string) {
    this.lblTitle.text = value;
  }
  static getHeight() {
    return Height;
  }
}
