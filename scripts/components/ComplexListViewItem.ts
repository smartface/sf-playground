import ComplexListViewItemDesign from 'generated/my-components/ComplexListViewItem';

export default class ComplexListViewItem extends ComplexListViewItemDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;

  }
}
