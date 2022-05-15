import LviTitleDesign from 'generated/my-components/LviTitle';

export default class LviTitle extends LviTitleDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
