import PgXHRDesign from 'generated/pages/pgXHR';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';

import XMLHttpRequest from '@smartface/native/net/xhr';
let xhr = new XMLHttpRequest();

export default class PgXHR extends withDismissAndBackButton(PgXHRDesign) {
  private _requestNumber = 1;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnGet.on('press', () => this.getRequest());
    this.btnPost.on('press', () => this.postRequest());
    this.btnPut.on('press', () => this.putRequest());
    this.btnPatch.on('press', () => this.patchRequest());
    this.btnDelete.on('press', () => this.deleteRequest());
  }

  deleteRequest() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (String(xhr.status).startsWith('2')) {
        console.log('DELETE', xhr);
        this.tvData.text = xhr.responseText;
      } else {
        console.warn('error', xhr);
      }
      this._requestNumber += 1;
    };

    xhr.open('DELETE', 'https://jsonplaceholder.typicode.com/posts/1');
    xhr.send();
  }

  patchRequest() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (String(xhr.status).startsWith('2')) {
        console.log('PATCH', xhr);
        this.tvData.text = xhr.responseText;
      } else {
        console.warn('error', xhr);
      }
      this._requestNumber += 1;
    };

    xhr.open('PATCH', 'https://jsonplaceholder.typicode.com/posts/1');
    xhr.send(
      JSON.stringify({
        title: 'foo - ' + this._requestNumber
      })
    );
  }

  putRequest() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
      if (String(xhr.status).startsWith('2')) {
        console.log('PUT', xhr);
        this.tvData.text = xhr.responseText;
      } else {
        console.warn('error', xhr);
      }
      this._requestNumber += 1;
    };

    xhr.open('PUT', 'https://jsonplaceholder.typicode.com/posts/1');
    xhr.send(
      JSON.stringify({
        id: 1,
        title: 'foo - ' + this._requestNumber,
        body: 'bar',
        userId: 1
      })
    );
  }

  postRequest() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (String(xhr.status).startsWith('2')) {
        console.log('POST', xhr);
        this.tvData.text = xhr.responseText;
      } else {
        console.warn('error', xhr);
      }
      this._requestNumber += 1;
    };

    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts');
    xhr.send(
      JSON.stringify({
        title: 'foo - ' + this._requestNumber,
        body: 'bar',
        userId: 1
      })
    );
  }

  getRequest() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (String(xhr.status).startsWith('2')) {
        console.log('GET', xhr);
        this.tvData.text = xhr.responseText;
      } else {
        console.warn('error', xhr);
      }
      this._requestNumber += 1;
    };

    xhr.open('GET', `https://jsonplaceholder.typicode.com/todos/${this._requestNumber}`);
    xhr.send();
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  onLoad() {
    super.onLoad();
  }
}
