import { ConstructorOf } from '@smartface/styling-context/lib/ConstructorOf';
import Page from '@smartface/native/ui/page';
import Page1 from 'pages/page1';
import PgMapView from 'pages/pgMapView';
import PgMapViewRadius from 'pages/pgMapViewRadius';
import PgZoomableImageView from 'pages/pgZoomableImageView';
import PgMapViewRegion from 'pages/pgMapViewRegion';
import PgHeaderImageAndItems from 'pages/pgHeaderImageAndItems';
import PgEventEmitter from 'pages/pgEventEmitter';
import PgArt from 'pages/pgArt';
import PgFileUpload from 'pages/pgFileUpload';
import PgListViewIndex from 'pages/pgListViewIndex';
import PgNativeSwitch from 'pages/pgNativeSwitch';
import Page2 from 'pages/page2';
import PageHideShow from 'pages/pageHideShow';
import PgChart from 'pages/pgChart';
import PgLogin from 'pages/pgLogin';
import PgButtonPress from 'pages/pgButtonPress';
import PgWebSocket from 'pages/pgWebSocket';
import PgBadgeAnimation from 'pages/pgBadgeAnimation';
import PgHeaderSearch from 'pages/pgHeaderSearch';
import PgNoTouch from 'pages/pgNoTouch';
import PgSafeArea from 'pages/pgSafeArea';
import PgMapRegion from 'pages/pgMapRegion';
import PgSpriteView from 'pages/pgSpriteView';
import PgServiceCall from 'pages/pgServiceCall';
import PgWebView from 'pages/pgWebView';
import PgLocationManagment from 'pages/pgLocationManagment';
import PgAppleDevices from 'pages/pgAppleDevices';
import PgYogaTest from 'pages/pgYogaTest';
import PgColorAndHtml from 'pages/pgColorAndHtml';
import PgModalTest from 'pages/pgModalTest';
import PgOTP from 'pages/pgOTP';
import PgSSLPinning from 'pages/pgSSLPinning';
import PgListViewMaterial from 'pages/pgListViewMaterial';
import PgPhotoPicker from 'pages/pgPhotoPicker';
import PgDynamicSize from 'pages/pgDynamicSize';
import PageSample from 'pages/pageSample';
import PgComponentFromCode from 'pages/pgComponentFromCode';
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
import PgApplicationEvents from 'pages/pgApplicationEvents';
import PgRangeSlider from 'pages/pgRangeSlider';
import PgTimePicker from 'pages/pgTimePicker';
import PgViewGroup from 'pages/pgViewGroup';
import PgBlurView from 'pages/pgBlurView';
import PgLabel from 'pages/pgLabel';
import PgTextBox from 'pages/pgTextBox';
import PgListView from 'pages/pgListView';
import PgModalBottomSheet from 'pages/pgModalBottomSheet';
import PgPicker from 'pages/pgPicker';
import PgGridView from 'pages/pgGridView';
import PgShimmerFlexLayout from 'pages/pgShimmerFlexLayout';
import PgTabbarController from 'pages/pgTabbarController';
import PgListViewDragDrop from 'pages/pgListviewDragDrop';
import PgListviewZebra from 'pages/pgListviewZebra';
import PgListViewSticky from 'pages/pgListviewSticky';
import PgListViewSwipe from 'pages/pgListviewSwipe';
import PgListViewPagination from 'pages/pgListviewPagination';
import PgListViewMultiple from 'pages/pgListviewMultipleLvi';
import PgGridViewFullSpan from 'pages/pgGridViewFullSpan';
import PgGridViewHorizontalCard from 'pages/pgGridViewHorizontalCard';
import PgGridViewRowRange from 'pages/pgGridViewPagination';
import PgGridViewPagination from 'pages/pgGridViewRowRange';
import PgTouchHandling from 'pages/pgTouchHandling';
import PgContacts from 'pages/pgContacts';
import PgMultimedia from 'pages/pgMultimedia';
import PgBlob from 'pages/pgBlob';
import PgSecureData from 'pages/pgSecureData';
import PgShare from 'pages/pgShare';
import PgTimer from 'pages/pgTimer';
import PgActivityIndicator from 'pages/pgActivityIndicator';
import PgAlertView from 'pages/pgAlertView';
import PgImageView from 'pages/pgImageView';
import PgScrollView from 'pages/pgScrollView';
import PgLiveMediaPlayer from 'pages/pgLiveMediaPlayer';

type Tab = { name: string; tabIndex: number; pages: ConstructorOf<Page>[] };

export const tab0: Tab = {
  name: 'Native',
  tabIndex: 0,
  pages: [
    PgFileUpload,
    PgBadgeAnimation,
    PgTouchHandling,
    PgComponentFromCode,
    PgButtonPress,
    PgMapView,
    PgMapViewRadius,
    PgMapRegion,
    PgShimmerFlexLayout,
    PgTabbarController as any,
    PgListViewDragDrop,
    PgListviewZebra,
    PgListViewSticky,
    PgListViewSwipe,
    PgListViewPagination,
    PgListViewMultiple,
    PgMapViewRegion,
    PgHeaderImageAndItems,
    PgEventEmitter,
    PgNativeSwitch,
    PageHideShow,
    PgDynamicSize,
    PgNativeFunctions,
    PgPhotoPicker,
    PgToastMessage,
    PgHttp,
    PgFileIO,
    PgSound,
    PgAsyncTask,
    PgRangeSlider,
    PgListView,
    PgGridView,
    PgPicker,
    PgTimePicker,
    PgViewGroup,
    PgBlurView,
    PgLabel,
    PgTextBox,
    PgSpeechRecognizer,
    PgGridViewFullSpan,
    PgGridViewHorizontalCard,
    PgGridViewRowRange,
    PgGridViewPagination,
    PgContacts,
    PgMultimedia,
    PgBlob,
    PgSecureData,
    PgShare,
    PgTimer,
    PgActivityIndicator,
    PgAlertView,
    PgImageView,
    PgScrollView,
    PgLiveMediaPlayer
  ]
};

export const tab1: Tab = {
  name: 'Utility',
  tabIndex: 1,
  pages: [PgArt, PgChart, PgWebSocket, PgServiceCall, PgLocationManagment, PgAppleDevices, PgColorAndHtml, PgSSLPinning]
};

export const tab2: Tab = {
  name: 'Modules',
  tabIndex: 2,
  pages: [PgListViewMaterial, PgZoomableImageView, PgListViewIndex, PgSpriteView]
};

export const tab3: Tab = {
  name: 'Router',
  tabIndex: 3,
  pages: [PgModalTest, PgModalBottomSheet]
};

export const tab4: Tab = {
  name: 'Miscellaneous',
  tabIndex: 4,
  pages: [PageSample, PgYogaTest, Page1, Page2, PgLogin, PgHeaderSearch, PgNoTouch, PgSafeArea, PgWebView, PgOTP, PgGlide, PgTouchConfiguration, PgCrypto, PgApplicationEvents]
};
