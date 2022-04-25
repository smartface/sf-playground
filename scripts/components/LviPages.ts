import LviPagesDesign from 'generated/my-components/LviPages';

export default class LviPages extends LviPagesDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
