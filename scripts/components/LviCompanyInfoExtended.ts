import LviCompanyInfoExtendedDesign from 'generated/my-components/LviCompanyInfoExtended';
import { themeService } from 'theme';
const Height = themeService.getNativeStyle('.lviCompanyInfoExtended').height;

export default class LviCompanyInfoExtended extends LviCompanyInfoExtendedDesign {
  pageName?: string | undefined;
  private _onImageClick: (...args) => void = () => {};
  constructor(props?: any, pageName?: string) {
    super(props);
    this.pageName = pageName;
    this.flRightLayout.on('touchEnded', () => {
      this._onImageClick && this._onImageClick();
    });
  }
  set onImageClick(value: (...args) => void) {
    this._onImageClick = value;
  }
  get name(): string {
    return this.lblCompanyName.text;
  }
  set name(value: string) {
    this.lblCompanyName.text = value;
  }
  get section(): string {
    return this.lblCompanySection.text;
  }
  set section(value: string) {
    this.lblCompanySection.text = value;
  }
  get info(): string {
    return this.lblCompanyInfo.text;
  }
  set info(value: string) {
    this.lblCompanyInfo.text = value;
  }
  set separatorVisible(value: boolean) {
    this.separator.dispatch({
      type: 'updateUserStyle',
      userStyle: {
        visible: value
      }
    });
  }
  static getHeight() {
    return Height;
  }
}
