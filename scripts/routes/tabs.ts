import { ConstructorOf } from '@smartface/styling-context/lib/ConstructorOf';
import Page from '@smartface/native/ui/page';
import Page1 from 'pages/page1';
import PgMapView from 'pages/pgMapView';
import PgMapViewRadius from 'pages/pgMapViewRadius';
import PgZoomableImageView from 'pages/pgZoomableImageView';
import PgMapViewRegion from 'pages/pgMapViewRegion';
import PgHeaderImageAndItems from 'pages/pgHeaderImageAndItems';
import PgArt from 'pages/pgArt';
import PgFileUpload from 'pages/pgFileUpload';
import PgListViewIndex from 'pages/pgListViewIndex';
import PgSwitch from 'pages/pgSwitch';
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
import PgRangeSliderAndSlider from 'pages/pgRangeSliderAndSlider';
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
import PgTextArea from 'pages/pgTextArea';
import PgFlexLayout from 'pages/pgFlexLayout';
import PgMaterialTextBox from 'pages/pgMaterialTextBox';
import PgQuickLook from 'pages/pgQuickLook';
import PgGifImageView from 'pages/pgGifImageView';
import PgWebBrowser from 'pages/pgWebBrowser';
import PgView from 'pages/pgView';
import PgSelectablePicker from 'pages/pgSelectablePicker';
import PgCallDetection from 'pages/pgCallDetection';
import PgVideoView from 'pages/pgVideoView';
import PgStatusBar from 'pages/pgStatusBar';
import PgHeaderBar from 'pages/pgHeaderBar';
import PgSearchView from 'pages/pgSearchView';
import PgEmailComposer from 'pages/pgEmailComposer';
import PgDatePicker from 'pages/pgDatePicker';
import PgLiveMediaPublisher from 'pages/pgLiveMediaPublisher';
import PgButton from 'pages/pgButton';
import PgAxios from 'pages/pgAxios';
import PgSystem from 'pages/pgSystem';

type Tab = { name: string; tabIndex: number; pages: ConstructorOf<Page>[] };

export const tab0: Tab = {
  name: 'Native',
  tabIndex: 0,
  pages: [
    PgSearchView,
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
    PgSwitch,
    PageHideShow,
    PgNativeFunctions,
    PgToastMessage,
    PgHttp,
    PgFileIO,
    PgSound,
    PgAsyncTask,
    PgRangeSliderAndSlider,
    PgListView,
    PgSystem,
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
    PgLiveMediaPlayer,
    PgLiveMediaPublisher,
    PgTextArea,
    PgFlexLayout,
    PgMaterialTextBox,
    PgQuickLook,
    PgGifImageView,
    PgWebBrowser,
    PgView,
    PgSelectablePicker,
    PgCallDetection,
    PgVideoView,
    PgStatusBar,
    PgHeaderBar,
    PgEmailComposer,
    PgDatePicker,
    PgWebView,
    PgButton
  ]
};

export const tab1: Tab = {
  name: 'Utility',
  tabIndex: 1,
  pages: [PgPhotoPicker, PgArt, PgChart, PgWebSocket, PgServiceCall, PgLocationManagment, PgAppleDevices, PgColorAndHtml, PgSSLPinning, PgAxios]
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
  name: 'Misc',
  tabIndex: 4,
  pages: [
    PgYogaTest,
    Page1,
    Page2,
    PgLogin,
    PgHeaderSearch,
    PgNoTouch,
    PgSafeArea,
    PgOTP,
    PgGlide,
    PgTouchConfiguration,
    PgCrypto,
    PgApplicationEvents,
    PgFileUpload,
    PgBadgeAnimation,
    PgTouchHandling,
    PgComponentFromCode,
    PgButtonPress,
    PgDynamicSize
  ]
};
