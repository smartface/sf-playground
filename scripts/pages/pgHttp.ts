import PgHttpDesign from 'generated/pages/pgHttp';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { Http } from '@smartface/native/net';
import Image from '@smartface/native/ui/image';

export default class PgHttp extends withDismissAndBackButton(PgHttpDesign) {
  myHttp = new Http();
  constructor(private router?: Router, private route?: Route) {
    super({});

    this.btnGetData.on('press', () => this.getData());
    this.btnGetImage.on('press', () => this.getImage());
    this.btnGetString.on('press', () => this.getString());
    this.btnDelete.on('press', () => this.delete());
    this.btnPost.on('press', () => this.post());
    this.btnPatch.on('press', () => this.patch());
    this.btnPut.on('press', () => this.put());
    this.btnAll.on('press', () => {
      this.getData();
      this.getImage();
      this.getString();
      this.delete();
      this.post();
      this.patch();
      this.put();
    });
  }

  put() {
    this.myHttp.requestJSON({
      method: 'PUT',
      url: 'https://httpbin.org/put',
      onLoad: (e: { statusCode: number; headers?: Record<string, string>; body?: Record<string, any>; JSON?: { data?: string } }): void => {
        console.log(`method: 'PUT' SUCCESSFUL`, e);
      },
      onError: (e: { message?: string; body?: any; statusCode?: number; headers?: Record<string, string> }) => {
        console.error(`method: 'PUT' FAILURE`, e);
      },
      //@ts-ignore
      body: '{ example: "putting"}'
    });
  }

  patch() {
    this.myHttp.requestJSON({
      method: 'PATCH',
      url: 'https://httpbin.org/patch',
      onLoad: (e: { statusCode: number; headers?: Record<string, string>; body?: Record<string, any>; JSON?: { data?: string } }): void => {
        console.log(`method: 'PATCH' SUCCESSFUL`, e);
      },
      onError: (e: { message?: string; body?: any; statusCode?: number; headers?: Record<string, string> }) => {
        console.error(`method: 'PATCH' FAILURE`, e);
      },
      //@ts-ignore
      body: '{ example: "patching"}'
    });
  }

  post() {
    this.myHttp.requestJSON({
      method: 'POST',
      url: 'https://httpbin.org/post',
      onLoad: (e: { statusCode: number; headers?: Record<string, string>; body?: Record<string, any>; JSON?: { data?: string } }): void => {
        console.log(`method: 'POST' SUCCESSFUL`, e);
      },
      onError: (e: { message?: string; body?: any; statusCode?: number; headers?: Record<string, string> }) => {
        console.error(`method: 'POST' FAILURE`, e);
      },
      //@ts-ignore
      body: '{ example: "posting"}'
    });
  }

  delete() {
    this.myHttp.requestJSON({
      method: 'DELETE',
      url: 'https://httpbin.org/delete',
      onLoad: (e: { statusCode: number; headers?: Record<string, string>; body?: Record<string, any> }): void => {
        console.log(`method: 'DELETE' SUCCESSFUL`, e);
      },
      onError: (e: { message?: string; body?: any; statusCode?: number; headers?: Record<string, string> }) => {
        console.error(`method: 'DELETE' FAILURE`, e);
      },
      //@ts-ignore
      body: '{ example: "deleting"}'
    });
  }

  getString() {
    this.myHttp.requestString({
      method: 'GET',
      url: 'https://httpbin.org/get',
      onLoad: (e: { statusCode: number; headers?: Record<string, string>; body?: Record<string, any> }): void => {
        console.log(`method: 'GET by requestString' SUCCESSFUL`, e);
      },
      onError: (e: { message?: string; body?: any; statusCode?: number; headers?: Record<string, string> }) => {
        console.error(`method: 'GET by requestString' FAILURE`, e);
      }
    });
  }

  getImage() {
    this.myHttp.requestImage({
      method: 'GET',
      url: 'https://httpbin.org/image/png',
      onLoad: (e: { statusCode: number; headers: { [key: string]: string }; image: Image }): void => {
        this.imgData.image = e.image;
      },
      onError: (e: { message: string; body: any; statusCode: number; headers: { [key: string]: string } }): void => {
        console.error(`method: 'GET by requestImage' FAILURE`, e);
      }
    });
  }

  getData() {
    this.myHttp.requestJSON({
      method: 'GET',
      url: 'https://httpbin.org/get',
      onLoad: (e: { statusCode: number; headers?: Record<string, string>; body?: Record<string, any> }): void => {
        console.log(`method: 'GET by requestJSON' SUCCESSFUL`, e);
      },
      onError: (e: { message?: string; body?: any; statusCode?: number; headers?: Record<string, string> }) => {
        console.error(`method: 'GET by requestJSON' FAILURE`, e);
      }
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
