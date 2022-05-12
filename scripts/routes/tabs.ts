import { ConstructorOf } from '@smartface/styling-context/lib/ConstructorOf';
import Page from '@smartface/native/ui/page';
import Page1 from 'pages/page1';
import MapView from 'pages/MapView';
import MapViewRadius from 'pages/MapViewRadius';
import ZoomableImageView from 'pages/ZoomableImageView';
import MapViewRegion from 'pages/MapViewRegion';
import HeaderImageAndItems from 'pages/HeaderImageAndItems';
import EventEmitter from 'pages/EventEmitter';
import Art from 'pages/Art';
import FileUpload from 'pages/FileUpload';
import ListViewIndex from 'pages/ListViewIndex';
import Switch from 'pages/Switch';
import Page2 from 'pages/page2';
import PageHideShow from 'pages/pageHideShow';
import Chart from 'pages/Chart';
import Login from 'pages/Login';
import ButtonPress from 'pages/ButtonPress';
import WebSocket from 'pages/WebSocket';
import BadgeAnimation from 'pages/BadgeAnimation';
import HeaderSearch from 'pages/HeaderSearch';
import NoTouch from 'pages/NoTouch';
import SafeArea from 'pages/SafeArea';
import MapRegion from 'pages/MapRegion';
import SpriteView from 'pages/SpriteView';
import ServiceCall from 'pages/ServiceCall';
import WebView from 'pages/WebView';
import LocationManagment from 'pages/LocationManagment';
import AppleDevices from 'pages/AppleDevices';
import YogaTest from 'pages/YogaTest';
import ColorAndHtml from 'pages/ColorAndHtml';
import ModalTest from 'pages/ModalTest';
import OTP from 'pages/OTP';
import SSLPinning from 'pages/SSLPinning';
import ListViewMaterial from 'pages/ListViewMaterial';
import PhotoPicker from 'pages/PhotoPicker';
import DynamicSize from 'pages/DynamicSize';
import ComponentFromCode from 'pages/ComponentFromCode';
import Glide from 'pages/Glide';
import NativeFunctions from 'pages/NativeFunctions';
import TouchConfiguration from 'pages/TouchConfiguration';
import ToastMessage from 'pages/ToastMessage';
import Http from 'pages/Http';
import FileIO from 'pages/FileIO';
import Sound from 'pages/Sound';
import AsyncTask from 'pages/AsyncTask';
import Crypto from 'pages/Crypto';
import SpeechRecognizer from 'pages/SpeechRecognizer';
import ApplicationEvents from 'pages/ApplicationEvents';
import RangeSliderAndSlider from 'pages/RangeSliderAndSlider';
import TimePicker from 'pages/TimePicker';
import ViewGroup from 'pages/ViewGroup';
import BlurView from 'pages/BlurView';
import Label from 'pages/Label';
import TextBox from 'pages/TextBox';
import ListView from 'pages/ListView';
import ModalBottomSheet from 'pages/ModalBottomSheet';
import Picker from 'pages/Picker';
import GridView from 'pages/GridView';
import ShimmerFlexLayout from 'pages/ShimmerFlexLayout';
import TabbarController from 'pages/TabbarController';
import ListViewDragDrop from 'pages/ListviewDragDrop';
import ListviewZebra from 'pages/ListviewZebra';
import ListViewSticky from 'pages/ListviewSticky';
import ListViewSwipe from 'pages/ListviewSwipe';
import ListViewPagination from 'pages/ListviewPagination';
import ListViewMultiple from 'pages/ListviewMultipleLvi';
import GridViewFullSpan from 'pages/GridViewFullSpan';
import GridViewHorizontalCard from 'pages/GridViewHorizontalCard';
import GridViewRowRange from 'pages/GridViewPagination';
import GridViewPagination from 'pages/GridViewRowRange';
import TouchHandling from 'pages/TouchHandling';
import Contacts from 'pages/Contacts';
import Multimedia from 'pages/Multimedia';
import Blob from 'pages/Blob';
import SecureData from 'pages/SecureData';
import Share from 'pages/Share';
import Timer from 'pages/Timer';
import ActivityIndicator from 'pages/ActivityIndicator';
import AlertView from 'pages/AlertView';
import ImageView from 'pages/ImageView';
import ScrollView from 'pages/ScrollView';
import LiveMediaPlayer from 'pages/LiveMediaPlayer';
import TextArea from 'pages/TextArea';
import FlexLayout from 'pages/FlexLayout';
import MaterialTextBox from 'pages/MaterialTextBox';
import QuickLook from 'pages/QuickLook';
import GifImageView from 'pages/GifImageView';
import WebBrowser from 'pages/WebBrowser';
import View from 'pages/View';
import SelectablePicker from 'pages/SelectablePicker';
import CallDetection from 'pages/CallDetection';
import VideoView from 'pages/VideoView';
import StatusBar from 'pages/StatusBar';
import HeaderBar from 'pages/HeaderBar';
import SearchView from 'pages/SearchView';
import EmailComposer from 'pages/EmailComposer';
import DatePicker from 'pages/DatePicker';
import LiveMediaPublisher from 'pages/LiveMediaPublisher';
import Button from 'pages/Button';
import Axios from 'pages/Axios';

type Tab = { name: string; tabIndex: number; pages: ConstructorOf<any>[] };

export const tab0: Tab = {
  name: 'Native',
  tabIndex: 0,
  pages: [
    SearchView,
    MapView,
    MapViewRadius,
    MapRegion,
    ShimmerFlexLayout,
    TabbarController as any,
    ListViewDragDrop,
    ListviewZebra,
    ListViewSticky,
    ListViewSwipe,
    ListViewPagination,
    ListViewMultiple,
    MapViewRegion,
    HeaderImageAndItems,
    EventEmitter,
    Switch,
    PageHideShow,
    NativeFunctions,
    ToastMessage,
    Http,
    FileIO,
    Sound,
    AsyncTask,
    RangeSliderAndSlider,
    ListView,
    GridView,
    Picker,
    TimePicker,
    ViewGroup,
    BlurView,
    Label,
    TextBox,
    SpeechRecognizer,
    GridViewFullSpan,
    GridViewHorizontalCard,
    GridViewRowRange,
    GridViewPagination,
    Contacts,
    Multimedia,
    Blob,
    SecureData,
    Share,
    Timer,
    ActivityIndicator,
    AlertView,
    ImageView,
    ScrollView,
    LiveMediaPlayer,
    LiveMediaPublisher,
    TextArea,
    FlexLayout,
    MaterialTextBox,
    QuickLook,
    GifImageView,
    WebBrowser,
    View,
    SelectablePicker,
    CallDetection,
    VideoView,
    StatusBar,
    HeaderBar,
    EmailComposer,
    DatePicker,
    WebView,
    Button
  ]
};

export const tab1: Tab = {
  name: 'Utility',
  tabIndex: 1,
  pages: [PhotoPicker, Art, Chart, WebSocket, ServiceCall, LocationManagment, AppleDevices, ColorAndHtml, SSLPinning, Axios]
};

export const tab2: Tab = {
  name: 'Modules',
  tabIndex: 2,
  pages: [ListViewMaterial, ZoomableImageView, ListViewIndex, SpriteView]
};

export const tab3: Tab = {
  name: 'Router',
  tabIndex: 3,
  pages: [ModalTest, ModalBottomSheet]
};

export const tab4: Tab = {
  name: 'Misc',
  tabIndex: 4,
  pages: [
    YogaTest,
    Page1,
    Page2,
    Login,
    HeaderSearch,
    NoTouch,
    SafeArea,
    OTP,
    Glide,
    TouchConfiguration,
    Crypto,
    ApplicationEvents,
    FileUpload,
    BadgeAnimation,
    TouchHandling,
    ComponentFromCode,
    ButtonPress,
    DynamicSize
  ]
};
