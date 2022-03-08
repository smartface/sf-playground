import { ConstructorOf } from "@smartface/styling-context/lib/ConstructorOf";
import Page from "@smartface/native/ui/page";
import Page1 from "pages/page1";
import PgMapView from "pages/pgMapView";
import PgMapViewRadius from "pages/pgMapViewRadius";
import PgZoomableImageView from "pages/pgZoomableImageView";
import PgMapViewRegion from "pages/pgMapViewRegion";
import PgHeaderImage from "pages/pgHeaderImage";
import PgEventEmitter from "pages/pgEventEmitter";
import PgArt from "pages/pgArt";
import PgFileUpload from "pages/pgFileUpload";
import PgListViewIndex from "pages/pgListViewIndex";
import PgNativeSwitch from "pages/pgNativeSwitch";
import Page2 from "pages/page2";
import PageHideShow from "pages/pageHideShow";
import PgChart from "pages/pgChart";
import PgLogin from "pages/pgLogin";
import PgButtonPress from "pages/pgButtonPress";
import PgWebSocket from "pages/pgWebSocket";
import PgBadgeAnimation from "pages/pgBadgeAnimation";
import PgHeaderSearch from "pages/pgHeaderSearch";
import PgNoTouch from "pages/pgNoTouch";
import PgSafeArea from "pages/pgSafeArea";
import PgMapRegion from "pages/pgMapRegion";
import PgSpriteView from "pages/pgSpriteView";
import PgServiceCall from "pages/pgServiceCall";
import PgWebView from "pages/pgWebView";
import PgLocationManagment from "pages/pgLocationManagment";
import PgAppleDevices from "pages/pgAppleDevices";
import PgYogaTest from 'pages/pgYogaTest';
import PgColorAndHtml from "pages/pgColorAndHtml";
import PgModalTest from "pages/pgModalTest";
import PgOTP from "pages/pgOTP";
import PgSSLPinning from "pages/pgSSLPinning";
import PgListViewMaterial from "pages/pgListViewMaterial";
import PgPhotoPicker from 'pages/pgPhotoPicker';
import PgDynamicSize from "pages/pgDynamicSize";
import PageSample from "pages/pageSample";
import PgComponentFromCode from "pages/pgComponentFromCode";
import PgGlide from 'pages/pgGlide';
import PgNativeFunctions from 'pages/pgNativeFunctions';
import PgTouchConfiguration from 'pages/pgTouchConfiguration';
import PgToastMessage from 'pages/pgToastMessage';
import PgHttp from 'pages/pgHttp';
import PgFileIO from 'pages/pgFileIO';
import PgSound from 'pages/pgSound';
import PgAsyncTask from 'pages/pgAsyncTask';
import PgCrypto from 'pages/pgCrypto';
import PgSpeechRecognizer from 'pages/pgSpeechRecognizer';


type Tab = { name: string; tabIndex: number; pages: ConstructorOf<Page>[] };

export const tab0: Tab = {
  name: "Native",
  tabIndex: 0,
  pages: [PgFileUpload, PgBadgeAnimation, PgComponentFromCode, PgButtonPress, PgMapView, PgMapViewRadius, PgMapRegion, PgMapViewRegion, PgHeaderImage, PgEventEmitter, PgNativeSwitch, PageHideShow, PgYogaTest, PgDynamicSize, PgNativeFunctions, PgPhotoPicker, PgToastMessage, PgHttp, PgFileIO, PgSound, PgAsyncTask],
};

export const tab1: Tab = {
  name: "Utility",
  tabIndex: 1,
  pages: [PgArt, PgChart, PgWebSocket, PgServiceCall, PgLocationManagment, PgAppleDevices, PgColorAndHtml, PgSSLPinning],
};

export const tab2: Tab = {
  name: "Modules",
  tabIndex: 2,
  pages: [PgListViewMaterial, PgZoomableImageView, PgListViewIndex, PgSpriteView],
};

export const tab3: Tab = {
  name: "Router",
  tabIndex: 3,
  pages: [PgModalTest],
};

export const tab4: Tab = {
  name: "Miscellaneous",
  tabIndex: 4,
  pages: [PageSample, Page1, Page2, PgLogin, PgHeaderSearch, PgNoTouch, PgSafeArea, PgWebView, PgOTP, PgGlide, PgTouchConfiguration, PgCrypto, PgSpeechRecognizer],
};
