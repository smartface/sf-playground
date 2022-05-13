import PgAxiosDesign from 'generated/pages/pgAxios';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import axios from 'axios';

export default class PgAxios extends withDismissAndBackButton(PgAxiosDesign) {
  private _requestNumber = 1;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.tvData.maxLines = 0;
    this.btnGet.on('press', () => this.getRequest());
    this.btnPost.on('press', () => this.postRequest());
    this.btnPut.on('press', () => this.putRequest());
    this.btnPatch.on('press', () => this.patchRequest());
    this.btnDelete.on('press', () => this.deleteRequest());
  }

  deleteRequest() {
    return axios({
      method: 'DELETE',
      url: `https://jsonplaceholder.typicode.com/posts/1`
    })
      .then((response) => {
        console.log('DELETE', response);
        this.tvData.text = JSON.stringify(response.data);
      })
      .catch((err) => console.error(err.message, { stack: err.stack }))
      .finally(() => {
        this._requestNumber += 1;
      });
  }

  patchRequest() {
    return axios({
      method: 'PATCH',
      url: `https://jsonplaceholder.typicode.com/posts/1`,
      data: {
        title: 'foo - ' + this._requestNumber
      }
    })
      .then((response) => {
        console.log('PATCH', response);
        this.tvData.text = JSON.stringify(response.data);
      })
      .catch((err) => console.error(err.message, { stack: err.stack }))
      .finally(() => {
        this._requestNumber += 1;
      });
  }

  putRequest() {
    return axios({
      method: 'PUT',
      url: `https://jsonplaceholder.typicode.com/posts/1`,
      data: {
        id: 1,
        title: 'foo - ' + this._requestNumber,
        body: 'bar',
        userId: 1
      }
    })
      .then((response) => {
        console.log('PUT', response);
        this.tvData.text = JSON.stringify(response.data);
      })
      .catch((err) => console.error(err.message, { stack: err.stack }))
      .finally(() => {
        this._requestNumber += 1;
      });
  }

  postRequest() {
    return axios({
      method: 'POST',
      url: `https://jsonplaceholder.typicode.com/posts`,
      data: {
        title: 'foo - ' + this._requestNumber,
        body: 'bar',
        userId: 1
      }
    })
      .then((response) => {
        console.log('POST', response);
        this.tvData.text = JSON.stringify(response.data);
      })
      .catch((err) => console.error(err.message, { stack: err.stack }))
      .finally(() => {
        this._requestNumber += 1;
      });
  }

  getRequest() {
    return axios({
      method: 'GET',
      url: `https://jsonplaceholder.typicode.com/todos/${this._requestNumber}`
    })
      .then((response) => {
        console.log('GET', response);
        this.tvData.text = JSON.stringify(response.data);
      })
      .catch((err) => console.error(err.message, { stack: err.stack }))
      .finally(() => {
        this._requestNumber += 1;
      });
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
