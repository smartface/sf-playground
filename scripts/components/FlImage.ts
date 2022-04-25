import FlImageDesign from 'generated/my-components/FlImage';

export default class FlImage extends FlImageDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
