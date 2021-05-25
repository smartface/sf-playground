import LviBadgeDesign from 'generated/my-components/LviBadge';

export default class LviBadge extends LviBadgeDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
