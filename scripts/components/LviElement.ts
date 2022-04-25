import LviElementDesign from 'generated/my-components/LviElement';
import { themeService } from 'theme';

const wrapperClassName = '.lviElement-wrapper';

export default class LviElement extends LviElementDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    super(props);
    this.pageName = pageName;
  }

  get keyText(): string {
    return this.lblKey.text;
  }

  set keyText(key: string) {
    this.lblKey.text = key;
  }

  get valueText(): string {
    return this.lblValue.text;
  }

  set valueText(value: string) {
    this.lblValue.text = value;
  }

  toggleZebra(isZebra = false) {
    this.flElementWrapper.dispatch({
      type: 'pushClassNames',
      classNames: isZebra ? `${wrapperClassName}-zebra` : `${wrapperClassName}`
    });
  }

  static getHeight(): number {
    return themeService.getStyle('.lviElement').height || 0;
  }
}
