import PgAsyncTaskDesign from 'generated/pages/pgAsyncTask';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Http from '@smartface/native/net/http';
import Blob from '@smartface/native/global/blob';
import AsyncTask from '@smartface/native/global/asynctask';

export default class PgAsyncTask extends withDismissAndBackButton(PgAsyncTaskDesign) {
  http: Http = new Http();

  constructor(private router?: Router, private route?: Route) {
    super({});
    this.btnRun.on('press', () => this.runAsyncTask());
  }

  runAsyncTask() {
    const label = this.lblStatus;
    label.text = 'AsyncTask will be starting...';
    this.http.request({
      url: 'https://api.github.com/repos/smartface/contxjs',
      method: 'GET',
      onLoad: (response: { statusCode: number; headers: { [key: string]: string }; body: Blob }): void => {
        let result = response.body.toString();
        let parsedObject;
        label.text = 'AsyncTask Created';
        // Run new task
        var asyncTask = new AsyncTask();
        asyncTask.task = function () {
          parsedObject = JSON.parse(result);
        };
        asyncTask.onComplete = function () {
          label.text = 'AsyncTask Completed';
          console.log('parsedObject ', parsedObject);
        };
        asyncTask.run();
      },
      onError: (e: { message: string; body: any; statusCode: number; headers: { [key: string]: string } }): void => {
        // Handle error
      }
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
