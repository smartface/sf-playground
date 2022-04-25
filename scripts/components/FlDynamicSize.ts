import System from '@smartface/native/device/system';
import Page from '@smartface/native/ui/page';
import FlDynamicSizeDesign from 'generated/my-components/FlDynamicSize';

export default class FlNoSize extends FlDynamicSizeDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    super(props);
    this.pageName = pageName;
  }
  setText(value: string, page: Page) {
    this.lblDynamicSize.dirty();
    this.lblDynamicSize.text = value;
    if (System.OS === System.OSType.IOS) {
      page.layout.applyLayout();
    }
  }
}
