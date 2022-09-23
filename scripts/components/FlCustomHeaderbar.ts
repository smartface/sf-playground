import FlCustomHeaderbarDesign from 'generated/my-components/FlCustomHeaderbar';

export default class FlCustomHeaderbar extends FlCustomHeaderbarDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
