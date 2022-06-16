import PgLabelListViewDesign from 'generated/pages/pgLabelListView';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import LviTitle from 'components/LviTitle';
export default class PgLabelListView extends withDismissAndBackButton(PgLabelListViewDesign) {
	constructor(private router?: Router, private route?: Route) {
		super({});
	}

	/**
	 * @event onShow
	 * This event is called when the page appears on the screen (everytime).
	 */
	onShow() {
		super.onShow();
		this.initBackButton(this.router); //Addes a back button to the page headerbar.
	}

	/**
	 * @event onLoad
	 * This event is called once when the page is created.
	 */

	refreshListView() {

		this.listView1.itemCount = 30;
		this.listView1.refreshData();
	}

	initListView() {
		this.listView1.refreshEnabled = false;
		this.listView1.onRowHeight = (index) => {
			return 250
		};

		this.listView1.onRowBind = (listViewItem: LviTitle, index) => {
			console.log('listViewItem.nativeObject.toString():', listViewItem.nativeObject.toString());

			listViewItem.lblTitle.text = 'LABEL'

			setTimeout(() => {
			    listViewItem.lblTitle.dispatch({
			        type: 'updateUserStyle', userStyle: {
			            height: 100,
			        }
			    })
			}, 2000);
		};


	}

	onLoad() {
		super.onLoad();

		this.initListView()
		this.refreshListView()
	}
}
