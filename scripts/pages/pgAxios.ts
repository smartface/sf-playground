import PgAxiosDesign from 'generated/pages/pgAxios';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import axios from 'axios';

export default class PgAxios extends withDismissAndBackButton(PgAxiosDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.tvData.maxLines = 0;
    this.btnGet.on('press', () => this.getRequest());
  }

  getRequest() {
    axios
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => {
        this.tvData.text = JSON.stringify(response.data);
      })
      .catch((err) => console.error(err.message, { stack: err.stack }));
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
  }
}
