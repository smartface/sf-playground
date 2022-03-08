import PgAsyncTaskDesign from 'generated/pages/pgAsyncTask';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Http from '@smartface/native/net/http';
import Blob from "@smartface/native/global/blob";
import AsyncTask from "@smartface/native/asynctask";

export default class PgAsyncTask extends withDismissAndBackButton(PgAsyncTaskDesign) {
    http: Http = new Http();

  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  // The page design has been made from the code for better
  // showcase purposes. As a best practice, remove this and
  // use WYSIWYG editor to style your pages.
  centerizeTheChildrenLayout() {
    this.dispatch({
        type: "updateUserStyle",
        userStyle: {
            flexProps: {
              flexDirection: 'ROW',
              justifyContent: 'CENTER',
              alignItems: 'CENTER'
            }
        }
    })
  }

  onShow() {
    super.onShow();
  }

  onLoad() {
    super.onLoad();
    this.centerizeTheChildrenLayout();

    this.http.request({
        url: "https://api.github.com/repos/smartface/contxjs",
        method: "GET",
        onLoad: (response: {
          statusCode: number;
          headers: { [key: string]: string };
          body: Blob;
        }): void => {
          let result = response.body.toString();
          let parsedObject;
          // Run new task
          var asyncTask = new AsyncTask();
          asyncTask.task = function () {
            parsedObject = JSON.parse(result);
          };
          asyncTask.onComplete = function () {
            console.log("parsedObject ", parsedObject);
          };
          asyncTask.run();
        },
        onError: (e: {
          message: string;
          body: any;
          statusCode: number;
          headers: { [key: string]: string };
        }): void => {
          // Handle error
        },
      });
  }
}
