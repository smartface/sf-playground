import FlRow1LineDesign from 'generated/my-components/FlRow1Line';

export default class FlRow1Line extends FlRow1LineDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
