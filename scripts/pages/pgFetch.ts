import PgFetchDesign from 'generated/pages/pgFetch';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';

export default class PgFetch extends withDismissAndBackButton(PgFetchDesign) {
    private _requestNumber = 1;
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.btnGet.on('press', () => this.getRequest());
        this.btnPost.on('press', () => this.postRequest());
        this.btnPut.on('press', () => this.putRequest());
        this.btnPatch.on('press', () => this.patchRequest());
        this.btnDelete.on('press', () => this.deleteRequest());
    }

    getRequest() {
        return fetch(`https://jsonplaceholder.typicode.com/todos/${this._requestNumber}`, {
            method: 'GET'
        }).then(response => response.json())
            .then(data => {
                console.log('GET', data);
                this.tvData.text = JSON.stringify(data);
            })
            .catch((err) => console.error(err.message, { stack: err.stack }))
            .finally(() => {
                this._requestNumber += 1;
            });
    }
    postRequest() {
        return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo - ' + this._requestNumber,
                body: 'bar',
                userId: 1
            })
        }).then(response => response.json())
            .then(data => {
                console.log('POST', data);
                this.tvData.text = JSON.stringify(data);
            })
            .catch((err) => console.error(err.message, { stack: err.stack }))
            .finally(() => {
                this._requestNumber += 1;
            });
    }

    putRequest() {
        return fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PUT',
            body: JSON.stringify({
                id: 1,
                title: 'foo - ' + this._requestNumber,
                body: 'bar',
                userId: 1
            })
        }).then(response => response.json())
            .then(data => {
                console.log('PUT', data);
                this.tvData.text = JSON.stringify(data);
            })
            .catch((err) => console.error(err.message, { stack: err.stack }))
            .finally(() => {
                this._requestNumber += 1;
            });
    }

    patchRequest() {
        return fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PATCH',
            body: JSON.stringify({
                title: 'foo - ' + this._requestNumber
            })
        }).then(response => response.json())
            .then(data => {
                console.log('PATCH', data);
                this.tvData.text = JSON.stringify(data);
            })
            .catch((err) => console.error(err.message, { stack: err.stack }))
            .finally(() => {
                this._requestNumber += 1;
            });
    }

    deleteRequest() {
        return fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'DELETE',
        }).then(response => response.json())
            .then(data => {
                console.log('DELETE', data);
                this.tvData.text = JSON.stringify(data);
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


    onLoad() {
        super.onLoad();
    }
}
