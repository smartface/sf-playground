import FlWaitingIndicatorDesign from 'generated/my-components/FlWaitingIndicator';

export default class FlWaitingIndicator extends FlWaitingIndicatorDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
