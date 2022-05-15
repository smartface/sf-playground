import GviTitleDesign from 'generated/my-components/GviTitle';

export default class GviTitle extends GviTitleDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
