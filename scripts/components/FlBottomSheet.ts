import FlBottomSheetDesign from 'generated/my-components/FlBottomSheet';

export default class FlBottomSheet extends FlBottomSheetDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
