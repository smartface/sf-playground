import ListViewItem1Design from 'generated/my-components/ListViewItem1';

export default class ListViewItem1 extends ListViewItem1Design {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
